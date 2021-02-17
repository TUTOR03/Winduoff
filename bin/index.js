#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { commands, options } = require('./cmds.js')

let args = yargs(hideBin(process.argv))
.usage("Usage: <command> [options...]")
.command(commands)
options.forEach((ob)=>{
	args.option(...ob)
})
args = args
.demandCommand()
.help()
.wrap(80)
.argv