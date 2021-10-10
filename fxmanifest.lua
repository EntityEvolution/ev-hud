fx_version 'cerulean'

game 'gta5'

version '4.0.0'

description 'Standalone hud with framework supporrt created by a Entity Evolution'

lua54 'yes'
use_fxv2_oal 'yes'

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