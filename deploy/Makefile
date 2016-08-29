.PHONY: all

RESOURCE_GROUP=play-smart-proxy

install:
	npm install azure -g
	azure config mode arm
	npm install yamlxjson -g

group:
	azure group create -n $(RESOURCE_GROUP) -l "West Europe"

show:
	azure group deployment show $(RESOURCE_GROUP)

list:
	azure group deployment list $(RESOURCE_GROUP)

destroy:
	azure group deployment create -m complete -f purge.json $(RESOURCE_GROUP) default

dump:
	azure group export $(RESOURCE_GROUP) dump
