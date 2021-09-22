local isOpen, isPaused, isTalking, isUnderwater
local prop, model = 0, -1038739674
local anim = 'cellphone_text_in'

-- Handlers
AddEventHandler('esx_status:onTick', function(status)
	-- Check for map status
	if IsPauseMenuActive() and not isPaused then
		isPaused = true
		SendNUIMessage({action = "isPaused"})
	elseif not IsPauseMenuActive() and isPaused then
		isPaused = false
		SendNUIMessage({action = "notPaused"})
	end

	-- Player variables for UI
	local hunger, thirst, stress = 100, 100, 0
	for _, v in pairs(status) do
		if v.name == 'hunger' then hunger = v.percent
		elseif v.name == 'thirst' then thirst = v.percent
		elseif Config.useStress and v.name == 'stress' then stress = v.percent
		end
	end
	local ped, player = PlayerPedId(), PlayerId()
	local health = not IsEntityDead(ped) and math.ceil(GetEntityHealth(ped) - 100) or 0
	local oxygen = (GetPlayerUnderwaterTimeRemaining(player) * Config.oxygenMax) or 100
	local stamina = math.ceil(100 - GetPlayerSprintStaminaRemaining(player)) or 100
	local armor = GetPedArmour(ped) or 0
	local minutes, hours = GetClockMinutes(), GetClockHours()

	if minutes <= 9 then minutes = '0' .. minutes end
	if hours <= 9 then hours = '0' .. hours end

	-- Check if player is talking
	if NetworkIsPlayerTalking(player) and not isTalking then
		isTalking = true
		SendNUIMessage({
			action = 'talking',
			talking = true
		})
	elseif not NetworkIsPlayerTalking(player) and isTalking then
		isTalking = false
		SendNUIMessage({
			action = 'talking',
			talking = false
		})
	end

	local isSwimming = IsPedSwimmingUnderWater(ped)
	if Config.hideOxygen then
		if isSwimming and not isUnderwater then
			isUnderwater = true
			SendNUIMessage({
				action = 'swimming',
				swimming = true
			})
		elseif not isSwimming and isUnderwater then
			isUnderwater = false
			SendNUIMessage({
				action = 'swimming',
				swimming = false
			})
		end
	end

	--Sending Message to UI
	SendNUIMessage({
		action = 'hud',
		health = health,
		armor = armor,
		stamina = stamina,
		oxygen = oxygen,
		hunger = hunger,
		thirst = thirst,
		stress = stress or 0,
		time = hours .. ':' .. minutes
	})
end)

AddEventHandler('playerSpawned', function()
	Wait(2500)
	SendNUIMessage({ action = 'startUp' })
	TriggerEvent('chat:addSuggestion', '/' .. Config.hudCommand, Config.hudDesc, {})
	SendNUIMessage({
		action = 'swimming',
		swimming = not Config.hideOxygen
	})
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
		TriggerEvent('chat:addSuggestion', '/' .. Config.hudCommand, Config.hudDesc, {})
		Wait(2500)
		SendNUIMessage({ action = 'startUp' })
		SendNUIMessage({
			action = 'swimming',
			swimming = not Config.hideOxygen
		})
	end
end)

-- NUI callbacks
RegisterNUICallback('close', function()
	if isOpen then
		isOpen = false
		SetNuiFocus(false, false)
		StopAnim()
	end
end)

-- Opening Menu
RegisterCommand(Config.hudCommand, function()
	if not isOpen and not isPaused then
		isOpen = true
		SendNUIMessage({ action = 'show' })
		SetNuiFocus(true, true)
		StartAnim()
	end
end)

-- Functions
function StartAnim()
	local ped = PlayerPedId()
	local dict = IsPedInAnyVehicle(ped, false) and "anim@cellphone@in_car@ps" or 'cellphone@'

	RequestModel(model)
	while not HasModelLoaded(model) do Wait(10) end
	RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do Wait(10) end

	prop = CreateObject(model, 1.0, 1.0, 1.0, 1, 1, 0)
	local bone = GetPedBoneIndex(ped, 28422)
	local isUnarmed = GetCurrentPedWeapon(ped, 1)
	if isUnarmed then
		SetCurrentPedWeapon(ped, GetHashKey('WEAPON_UNARMED'), true)
	end
	AttachEntityToEntity(prop, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	TaskPlayAnim(ped, dict, anim, 3.0, -1, -1, 50, 0, false, false, false)
end

function StopAnim()
	if prop ~= 0 then
		local dict = IsPedInAnyVehicle(ped, false) and "anim@cellphone@in_car@ps" or 'cellphone@'
		local ped = PlayerPedId()
		DeleteEntity(prop)
		StopAnimTask(ped, dict, anim, 1.0)
		prop = 0
	end
end

function CurrentVoiceMode(value)
	if value == 1 then
		SendNUIMessage({
			action = 'voiceMode',
			microphone = 33
		})
	elseif value == 2 then
		SendNUIMessage({
			action = 'voiceMode',
			microphone = 66
		})
	elseif value == 3 then
		SendNUIMessage({
			action = 'voiceMode',
			microphone = 100
		})
	end
end