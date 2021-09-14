local name = "[^4ev-hud^7]"

AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        local function checkVersion(e, latestVersion, headers)
            local currentVersion = LoadResourceFile(resourceName, "version")
            if currentVersion ~= latestVersion and tonumber(currentVersion) < tonumber(latestVersion) then
                print(name .. " ^1is outdated.\nCurrent version: ^8" .. currentVersion ..
                "\nNewest version: ^2" .. latestVersion .. "\n^3Update^7: https://github.com/EntityEvolution/ev-hud/releases")
            elseif tonumber(currentVersion) > tonumber(latestVersion) then
                print(name .. " has skipped the latest version ^2" .. latestVersion..
                ". Either Github is offline or the version file has been changed")
            else
                print(name .. " is updated. ^3Settings saved values to players...")
                Wait(5000)
                print("^2Finished")
            end
        end

		PerformHttpRequest("https://raw.githubusercontent.com/EntityEvolution/ev-hud/main/version", checkVersion, "GET")
	end
end)