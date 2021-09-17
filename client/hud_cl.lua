local isOpen, isPaused
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
		hunger = v.name == 'hunger' and v.percent
		thirst = v.name == 'thirst' and v.percent
		stress = v.name == 'stress' and v.percent
	end
	local ped, player = PlayerPedId(), PlayerId()
	local health = not IsEntityDead(ped) and math.ceil(200 - GetEntityHealth(ped)) or 0
	local oxygen = GetPlayerUnderwaterTimeRemaining(player) * Config.oxygenMax
	local stamina = math.ceil(100 - GetPlayerSprintStaminaRemaining(player))
	local armor, id = GetPedArmour(ped), GetPlayerServerId(player)
	local minutes, hours = GetClockMinutes(), GetClockHours()

	if minutes <= 9 then minutes = '0' .. minutes end
	if hours <= 9 then hours = '0' .. hours end

	--Sending Message to UI
	SendNUIMessage({
		action = 'hud',
		health = health,
		armor = armor,
		stamina = stamina,
		oxygen = oxygen,
		hunger = hunger,
		thirst = thirst,
		stress = stress,
		time = hours .. ':' .. minutes
	})
end)

AddEventHandler('playerSpawned', function()
	Wait(2500)
	SendNUIMessage({ action = 'startUp' })
	TriggerEvent('chat:addSuggestion', '/' .. Config.hudCommand, Config.hudDesc, {})
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
		TriggerEvent('chat:addSuggestion', '/' .. Config.hudCommand, Config.hudDesc, {})
		Wait(2500)
		SendNUIMessage({ action = 'startUp' })
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