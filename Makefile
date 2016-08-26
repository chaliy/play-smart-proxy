.PHONY: all

start:
	cd service1 && make start &
	cd proxy && make start &
