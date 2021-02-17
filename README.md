# Winduoff

This is a node JS console application for windows users. It allows you to disable  
all windows's services that you put inside `config.js`  
It's really usefull thing, because windows likes to enable different services that  
you have already disabled ( ***USE LINUX*** )

# Documentation

```console
Usage: <command> [options ...]

Commands:
  dis [error] [prev]  Disable all services          [aliases: disable]

Options:
      --version  Show version number                         [boolean]
  -e, --error    Show errors during the process              [boolean]
  -p, --prev     Show previous state of the service          [boolean]
      --help     Show help                                   [boolean]
```