import random, sys

# returns list of tuples (row, col) of available spaces
def get_available_spaces(visited, row, col, preference, avoid):
    length = len(visited) - 1
    moves = [(0, -1, 0), (-1, 0, 1), (0, 1, 2), (1, 0, 3)]
    available_spaces = []

    for x_off, y_off, d in moves:
        i = row + x_off
        j = col + y_off

        if i < 0 or i > length or j < 0 or j > length:
            continue
        
        if not visited[i][j]:
           available_spaces.append((i, j, d))

    rm_index = None
    # removing avoided spaces
    if len(available_spaces) > 1:
        for index, space in enumerate(available_spaces):
            if avoid == space[2]:
                rm_index = index
                
    if rm_index != None:
        del available_spaces[rm_index]

    # check if last_dir is in the available spaces
    for space in available_spaces:
        if preference == space[2]:
            available_spaces.append(space)
            break
    return available_spaces


# makes the cell get the value at grid[row][col]
def visit(grid, row, col, value=True):
    grid[row][col] = value


# checks if each cell is 'checkfor' and return boolean grid
def get_visited(grid, checkfor='', reverse=False):
    visited = create_grid(len(grid), False)
    for i, row in enumerate(grid):
        for j, col in enumerate(grid[i]):
            if not reverse:
                if col != checkfor:
                    visited[i][j] = True
            else:
                if col == checkfor:
                    visited[i][j] = True

    return visited


# creates grid of size 'size' filled with 'value'
def create_grid(size, value=None):
    grid = []
    for i in range(size):
        grid.append([])
        for j in range(size):        
            grid[i].append(value)

    return grid


# creates the paths from start to end(s) as a grid
def paths(size, min_density=None, max_density=None):
    if min_density == None:
        min_density = 0.4
    if max_density == None:
        max_density = 0.7
        
    visited = create_grid(size, False)
    min_steps = int(size*size*min_density)
    max_steps = int(size*size*max_density)

    path_steps = random.randint(min_steps, max_steps)
    path = []

    # place start pipe
    i, j= random.randint(0, size - 1), random.randint(0, size - 1)
    path.append((i, j))
    visit(visited, i, j)
    last_dir = 0 # left
    last_turns = [0, 0] # before, now
    turn = None

    for step in range(path_steps - 1):
        if last_turns[0] == 3 and last_turns[1] == 0:
            turn = 1
        elif last_turns[0] == 0 and last_turns[1] == 3:
            turn = 2
        elif last_turns[0] - last_turns[1] == 1: # anticlockwise
            turn = 3 if last_turns[1] == 0 else last_turns[1] - 1
        elif last_turns[1] - last_turns[0] == 1: # clockwise
            turn = 0 if last_turns[1] == 3 else last_turns[1] + 1
        else:
            turn = None
            
        # advance one step
        spaces = get_available_spaces(visited, i, j, preference=last_dir, avoid=turn)
        if len(spaces) < 1:
            break
        
        i, j, last_dir = random.choice(spaces)
        path.append((i, j))
        visit(visited, i, j)
        last_turns = [last_turns[1], last_dir]
        
    return path, visited


def show(grid):
    print('')
    for i, row in enumerate(grid):
        for j, col in enumerate(grid[i]):
            print(1 if col else 0, end='  ')
        print('')
    
    
def main(*args):
    args = list(map(float, args[0]))
    min_density, max_density = None, None
    
    if len(args) > 2:
        min_density, max_density = args[1:]
    elif len(args) > 1:
        min_density = args[1]

    size = int(args[0])

    min_steps = int(size * size * 0.4)

    while True:
        path, visited = paths(size, min_density, max_density)
        if len(path) >= min_steps:
            break
    show(visited)

if __name__ == '__main__':
    # size, num_end, density
    main(sys.argv[1:])
