import sys


def read(file):
    with open(file) as f:
        return f.read()


def edit(file):
    data = read(file)
    
    with open(file, 'w') as svg:
        svg.write(data.replace('img', 'image'))        
    svg.close()

    if (data == read(file)):
        print('> changed nothing')
    else:
        print('> changed file')
    print('---')


def main(files):  
    if type(files) != list and type(files) != tuple:
        print('> editing file: ' + files)
        edit(files)
        
    else:
        for file in files:
            print('> editing file: ' + file)
            edit(file)
    print('> done.')
    input()


if __name__ == '__main__':
    main(sys.argv[1:])
