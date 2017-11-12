import pytoml as toml
import json
import os

source = './www_threefold/data/providers'
target = './www_threefold/web/js/contents.js'

providers = {}
output = []

for filename in os.listdir(source):

    if not filename.endswith(".toml"):
        continue

    print("Processing: %s" % filename)

    with open(os.path.join(source, filename), 'r') as f:
        data = toml.load(f)

    provider = {
        "name": data['provider']['name'],
        "description": data['provider']['description'],
        "website": data['provider']['website_url'],
        "resourcepools": []
    }

    # adding each resourcepool
    for rpool in data['resourcepool']:
        pool = {
            "lat": rpool['location'][0]['latitude'],
            "lon": rpool['location'][0]['longitute'],
            # "name": rpool['location'][0]['name'],
            "name": filename.replace(".toml", ""),
            "description": "---",
            "network_speed": rpool['network_speed'],
            "ipv4_enable": rpool['ipv4_enable'],
            "ipv6_enable": rpool['ipv6_enable'],
            "pricing_currency": rpool['pricing_currency'].upper(),
            "cu_planned": rpool['cu_planned'],
            "su_planned": rpool['su_planned'],
            "tu_planned": rpool['tu_planned'],
            "cu_max": rpool['cu_max'],
            "su_max": rpool['su_max'],
            "tu_max": rpool['tu_max'],
            "pricing": [],
            "status": rpool['status']
        }

        for pricing in rpool['pricing']:
            pool['pricing'].append({
                'months': pricing['min_nr_months'],
                'cu': pricing['cu'],
                'su': pricing['su'],
                'tu': pricing['tu'],
            })

        # fixing position if it overlaps


        # updating provider if it already exists
        if not providers.get(provider['name']):
            providers[provider['name']] = provider
            providers[provider['name']]['resourcepools'] = [pool]

        # append only the resourcepool to that existing provider
        else:
            providers[provider['name']]['resourcepools'].append(pool)


# merging everything together
for provider in providers:
    output.append(providers[provider])

print("Writing: %s" % target)
with open(target, 'w') as f:
    f.write('var globalcapacity = ' + json.dumps(output))
