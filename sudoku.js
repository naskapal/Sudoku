class Cell
{
  constructor(name)
  {
    this.name = name;
    this.element = [1,2,3,4,5,6,7,8,9];
  }

  removeElement(num)
  {
    this.element.splice(this.element.indexOf(num), 1);
  }

  checkElement(num)
  {
    return this.element.indexOf(num) === -1;
  }

  getLength()
  {
    return this.element.length;
  }

  getValue()
  {
    return this.element[0];
  }
}


class Board
{
  constructor(values)
  {
    this.field = values;
  }

  initialize()
  {
    let temp = 1;
    for (let i = 0; i < 9; i++)
    {
      for (let j = 0; j < 9; j++)
      {
        if (this.field[i][j] === 0)
        {
          this.field[i][j] = (new Cell(temp));
        }
        temp++;
      }
    }
  }

  solve ()
  {
    do
    {
      for (let i = 0; i < this.field.length; i++)
      {
        for (let j = 0; j < this.field.length; j++)
        {
          if (this.field[i][j].toString().length !== 1)
          {
            this.horizontalCheck(i, this.field[i][j]);
            this.verticalCheck(j, this.field[i][j]);
            this.blockCheck(i, j, this.field[i][j]);
            if (this.field[i][j].getLength() === 1)
            {
              let temp = this.field[i][j].getValue();
              this.field[i][j] = temp;
            }
          }
        }
      }
    } while (!this.isFull());
  }

  horizontalCheck (yLocation, cell)
  {
    for (let i = 0; i < this.field.length; i++)
    {
      if (!cell.checkElement(this.field[yLocation][i]))
      {
        cell.removeElement(this.field[yLocation][i]);
      }
    }
  }

  verticalCheck (xLocation, cell)
  {
    for (let i = 0; i < this.field.length; i++)
    {
      if (!cell.checkElement(this.field[i][xLocation]))
      {
        cell.removeElement(this.field[i][xLocation]);
      }
    }
  }

  blockCheck (xLocation, yLocation, cell)
  {
    let xStart = 0;
    let yStart = 0;

    if (xLocation < 3)
    {
      xStart = 0;
    }
    else if (xLocation < 6)
    {
      xStart = 3;
    }
    else
    {
      xStart = 6;
    }

    if (yLocation < 3)
    {
      yStart = 0;
    }
    else if (yLocation < 6)
    {
      yStart = 3;
    }
    else
    {
      yStart = 6;
    }

    for (let i = xStart; i < xStart + 3; i++)
    {
      for (let j = yStart; j < yStart + 3; j++)
        {
          if (!cell.checkElement(this.field[i][j]))
          {
            cell.removeElement(this.field[i][j]);
          }
        }
    }
  }

  isFull()
  {
    for (let i = 0; i < this.field.length; i++)
    {
      for (let j = 0; j < this.field.length; j++)
      {
        if (this.field[i][j].toString().length !== 1)
        {
          return false;
        }
      }
    }
    return true;
  }


}


let board = new Board(
  [
    [3,0,9,8,7,0,0,2,1],
    [0,0,2,9,0,6,0,7,8],
    [0,0,0,0,2,0,0,6,0],
    [8,5,0,2,0,3,0,9,6],
    [0,0,1,0,0,0,2,0,0],
    [2,9,0,7,0,5,0,4,3],
    [0,1,0,0,9,0,0,0,0],
    [9,7,0,1,0,8,4,0,0],
    [6,2,0,0,3,7,8,0,9]
  ]);

board.initialize();

console.log(board.solve());
console.log(JSON.stringify(board, 0, 2));
