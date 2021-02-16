#!/usr/bin/env node

const chalk = require("chalk")
const { exec } = require('child_process')
const config = require('./config.json')

const async_exec = (command, options={})=>{
	return new Promise((resolve, reject)=>{
		exec(`chcp 855 | ${command}`, options, (error, stdout, stderr)=>{
			if(error){
				reject( Object.entries(error).map((er)=>`${er[0]} : ${er[1]}`).join('\n') )
			}
			resolve({stdout, stderr})
		})
	})
}

const disableCommand = {
	command: 'dis [error] [prev]',
	aliases: ['disable'],
	desc: 'Disable all services',
	handler: (args)=>{
		let success_c = 0
		config.forEach(async (ob)=>{
			let add_output = ''
			async_exec(`sc qc "${ob}"`)
			.then((data)=>{
				data = parseInt(data.stdout.split('\n')[4].split(':')[1].split('  ')[0])
				if(args.prev){
					add_output = ` (was ${data == 4 ? chalk.red('DISABLED') : chalk.green('ENABLED')})`
				}
				return async_exec(`sc config "${ob}" start= disabled`)		
			})
			.then((_)=>{
				return async_exec(`sc query "${ob}"`)
			})
			.then((data)=>{
				data = parseInt(data.stdout.split('\n')[3].split(':')[1].split('  ')[0])
				if(data == 4){
					return async_exec(`sc stop "${ob}"`)
				}
			})
			.then((_)=>{
				console.log(`${ob} ${chalk.green('OK')}${add_output}`)
			})
			.catch((e)=>{
				console.log(`${ob} ${chalk.red('OK')}${args.error ? chalk.red('\nERROR:\n') : ''}${args.error ? e+'\n' : ''}`)
			})
		})
	}
}

const errorOption = [
	'error',
	{
		alias: 'e',
		type: 'boolean',
		describe: 'Show errors during the process',
	}
]

const prevOption = [
	'prev',
	{
		alias: 'p',
		type: 'boolean',
		describe: 'Show previous state of the service'
	}
]

exports.commands = [disableCommand]

exports.options = [errorOption, prevOption]
