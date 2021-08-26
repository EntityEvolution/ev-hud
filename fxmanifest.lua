fx_version 'cerulean'

game 'gta5'

version '3.2.1'

description 'Standalone hud created by a Entity Evolution'

lua54 'yes'

--shared_script '@qb-core/import.lua' -- Uncomment if you're planning to use QBCore

client_scripts {
	--'@vrp/lib/utils.lua', -- Uncomment if you're planning on using VRP Framework
	'config/config_cl.lua',
	'client/hud_cl.lua'
}

server_script 'server/version_sv.lua'

ui_page 'html/ui.html'

files {
	'html/ui.html',
	'html/css/*.css',
	'html/fonts/*.ttf',
	'config/config.js',
	'html/js/*.js',
	'html/img/noti.wav',
	'html/img/*.png',
	'html/img/logos/*.png'
}

exports {
	'CurrentVoiceMode'
}