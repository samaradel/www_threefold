# New ThreeFold Website

- promotor: Roel
- guardian: Michael


## Scrum Details for Web Team

* Daily scrum at 10am Brussels/Cairo
* Development team is lead by @hassane and backed by @adelsamar
* Sprints start at **Sunday** till **Thursday**
* ALL COMMUNICATION is handled through the issues in gogs
* EVERY ACTIVITY and certainly BLOCKERS are reported in in the gogs issues
* UI Testing is done each friday by @roelvansabben
* Sprintplanning is done each thursday


## Information

The new threefold website is being created using hugo/git.
Input for this site is being collected using issues being creating in git

This repo has the website content:

- has all markdown content
- also prio's & tasks are defined on our issues in this repo

Staging can be found here:

- https://threefold2.aydo.com/

Test can be found here:

- https://testthreefold.aydo.com/

For any GOGS related questions please contact:

Nickolay Babenko through telegram @nbabenko

## Technical content

- [Running](docs/Running.md)


## Editing at community page

if you need to add person at community page follow this link
[community](https://docs.greenitglobe.com/ThreeFold/www_threefold2.0/src/master/www.threefoldtoken.com/data)
- put the pictures at avatar 
- update data at ambassadors.toml or hosters.toml, operators.toml

update will show up at [Staging](http://threefold2.aydo.com:4040/community/) after 1 minut ,it will appear at production environment after merge master>production.


## Original Pictures

All pictures used on blogs, faq and other parts the website should be stored here. [Original_Pictures](https://docs.greenitglobe.com/ThreeFold/www_threefold2.0/src/master/www.threefoldtoken.com/data/fotos_original)
Never should we use these a source files for our website due to extremely large sized pictures.
Please refer to @roelvansabben if you need an image altered for web use.



## IT info

server running on

```
ssh -l root 212.23.52.72 -p 3331
```

- caddy is in ~/root/caddy
- running under tmux
- website is in /opt/code/...

more it info e.g. dns see: https://docs.greenitglobe.com/gig/org_it

