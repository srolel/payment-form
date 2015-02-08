// var cmds = {
// 	// npm: {
// 	// 	cmd: 'npm',
// 	// 	args: ['install']
// 	// },
// 	bower: {
// 		cmd: 'bower',
// 		args: ['install'],
// 		options: {
// 			cwd: './app',
// 			env: process.env
// 		}
// 	}
// }

// var spawn = require('child_process').spawn;

// Object.keys(cmds).forEach(function (key) {
// 	var cmd = cmds[key].cmd || cmds[key];
// 	var args = cmds[key].args || [];
// 	var opts = cmds[key].options || {};
// 	console.log(cmd, args, opts)
// 	if (typeof cmd !== 'string') throw new Error('command isn\'t a string');
// 	var process = spawn(cmd, args, opts);
// 	process.stdout.on('data', function (data) {
// 		console.log('stdout: ' + data);
// 	});

// 	process.stderr.on('data', function (data) {
// 		console.log('stderr: ' + data);
// 	});

// 	process.on('close', function (code) {
// 		console.log('child process exited with code ' + code);
// 	});
// });