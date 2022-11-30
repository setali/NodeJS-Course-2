// node 4-stderr.js 2> errors.txt 1> outputs.txt

process.stderr.write('error!!!!')

process.stdout.write('Its output')
