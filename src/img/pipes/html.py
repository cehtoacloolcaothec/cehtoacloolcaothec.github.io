from operator import methodcaller as mc
import re, random


pipe_types = {'a': 'empty', 'l': 'line', 'e': 'elbow', 'c': 'cross',
              't' : 't', 'd': 'dead', 's': 'start', 'f': 'end'}
pipe_sizes = {'nm': 'pipe-nm', 'sm': 'pipe-sm', 'md': 'pipe-md', 'lg' : 'pipe-lg', 'gt': 'pipe-gt'}
html_format = '<img class="pipe {0}-{1} {2}">\n'


def html(string, size, tabs=4):    
    values = re.split(r'(?<=\d|\w)\s*,\s*(?=\w)', string)
    pipes = []
    html_string = ''
    
    for pipe in values:
        if len(pipe) == 1 or ' ' not in pipe:
            pipes.append([pipe[0], '0' if pipe == 'a' or len(pipe) == 1 else pipe[1:]])
        else:
            pipes.append(re.split(r'\s+', pipe))

    for pipe, rot in pipes:
        if pipe != 'a':
            html_string += '\t'*tabs + html_format.format(pipe_types[pipe], rot, pipe_sizes[size])
        else:
            html_string += '\t'*tabs + '<img class="pipe empty {0}">\n'.format(pipe_sizes[size])

    print(html_string[tabs:])


def main():
    print('> starting')
    print('> list:\n\na (empty), l (line -), e (elbow ,-), c (cross +)\n'
          + 't (t |-), d (dead - ), s (start -), f (end -)')
    while 1:
        r = input('> ')
        if r == 'exit':
            break
        if r.split(' ')[0] == 'random':
            values = []
            for i in range(int(r.split(' ')[1])):
                values.append(list(pipe_types.keys())[random.randint(0, 7)])
            html(','.join(values), r.split(' ')[2])

        values = re.split(r'(?<=\w|\d)\s*;\s*', r)
        html(values[0], values[1], 4 if len(values) < 3 else values[2])

    input()


if __name__ == '__main__':
    main()
