// This is a code snippet from Paradise Station 13
// The Newscaster discord bot triggers this proc
world/Topic(T, addr, master, key)
	var/list/input = params2list(T)
	var/key_valid = (config.comms_password && input["key"] == config.comms_password)
	
	if("status" in input)
		var/list/s = list()
		var/list/admins = list()
		s["version"] = game_version
		s["mode"] = master_mode
		s["respawn"] = config ? abandon_allowed : 0
		s["enter"] = enter_allowed
		s["vote"] = config.allow_vote_mode
		s["ai"] = config.allow_ai
		s["host"] = host ? host : null
		s["players"] = list()
		s["roundtime"] = worldtime2text()
		s["stationtime"] = station_time_timestamp()
		s["oldstationtime"] = classic_worldtime2text()
		s["listed"] = "Public"
		if(!hub_password)
			s["listed"] = "Invisible"
		var/player_count = 0
		var/admin_count = 0

		for(var/client/C in GLOB.clients)
			if(C.holder)
				if(C.holder.fakekey)
					continue
				admin_count++
				admins += list(list(C.key, C.holder.rank))
			s["player[player_count]"] = C.key
			player_count++
		s["players"] = player_count
		s["admins"] = admin_count
		s["map_name"] = map_name ? map_name : "Unknown"

		if(key_valid)
			if(ticker && ticker.mode)
				s["real_mode"] = ticker.mode.name
				s["security_level"] = get_security_level()
				s["ticker_state"] = ticker.current_state

			if(SSshuttle && SSshuttle.emergency)
				s["shuttle_mode"] = SSshuttle.emergency.mode
				s["shuttle_timer"] = SSshuttle.emergency.timeLeft()

			for(var/i in 1 to admins.len)
				var/list/A = admins[i]
				s["admin[i - 1]"] = A[1]
				s["adminrank[i - 1]"] = A[2]

		return list2params(s)

// If you want to send information to your discord bot without having to send commands from the bot you
// can alternatively trigger the discord bot to do what you want with world.Export()
// example: world.Export("http://127.0.0.1:5001/?command=round_start&testkey=testvalue")