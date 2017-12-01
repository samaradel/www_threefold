import pytoml as toml
import json
import os
import base64
from PIL import Image

avatar_dimension = dict(ambassador=252, hoster=252, operator=252)

source = './www.threefoldtoken.com/data/www_threefold/data/community'
target = './www.threefoldtoken.com/data/www_threefold/data/community_data.js'

output = dict()

for filename in os.listdir(source):

    if not filename.endswith(".toml"):
        continue

    print("Processing: %s" % filename)

    with open(os.path.join(source, filename), 'r') as f:
        data = toml.load(f)

    section = []
    for key in data:
        if key not in avatar_dimension:
            raise ValueError("Unknown object %s in %s" % (key, filename))
        for person in data[key]:
            name = person.get('name')
            nationality = person.get('nationality')
            why = person.get('why')
            bio = person.get('bio')
            # x = person.get('x')
            # y = person.get('y')
            avatar = person.get('avatar')
            if None in (name, bio, nationality, why):
                raise ValueError("%s/%s contains invalid person entry with following data fields:\nname: %s\nnationality: %s\nwhy: %s\nbio: %s\navatar: %s\n\nNOT ALL FIELDS ARE FILLED!" % (source, filename, name, nationality, why, bio, avatar))            # try:
            #     x = int(x)
            #     y = int(y)
            # except ValueError:
            #     raise ValueError("%s/%s contains invalid person entry with following data fields:\nname: %s\nbio: %s\nx: %s\ny: %s\navatar: %s\n\nX & Y SHOULD BE POSITIVE INTEGERS!" % (source, filename, name, bio, x, y, avatar))
            # if x < 0 or y < 0:
            #     raise ValueError("%s/%s contains invalid person entry with following data fields:\nname: %s\nbio: %s\nx: %s\ny: %s\navatar: %s\n\nX & Y SHOULD BE POSITIVE INTEGERS!" % (source, filename, name, bio, x, y, avatar))
            if not os.path.exists(os.path.join(source, 'avatars', avatar)):
                raise ValueError("%s/%s contains invalid person entry with following data fields:\nname: %s\nbio: %s\navatar: %s\n\nAVATAR DOES NOT EXIST!" % (source, filename, name, bio, avatar))
            # coords = "%sx%s" % (x,y)
            # if section.get(coords):
            #     raise ValueError("%s/%s contains invalid person entry with following data fields:\nname: %s\nbio: %s\nx: %s\ny: %s\navatar: %s\n\nCOORDINATES ARE ALREADY IN USE!" % (source, filename, name, bio, x, y, avatar))


            avatar_filename = os.path.join(source, 'avatars', avatar)
            img = Image.open(avatar_filename)
            if img.height != img.width:
                side = min((img.width, img.height))
                img = img.crop((0,0,side,side))

            side = avatar_dimension[key]
            if img.height != side:
                img = img.resize((side, side))

            avatar_filename = os.path.join(source, 'avatars', "processed_"+avatar)
            img.save(avatar_filename)

            section.append(dict(name=name, nationality=nationality, why=why, bio=bio, avatar="processed_"+avatar))

    output[filename.replace(".toml","")] = section

with open(target, 'w') as f:
    for key, value in output.items():
        f.write("var ")
        f.write(key)
        f.write(" = ")
        f.write(json.dumps(value))
        f.write(";\n")
