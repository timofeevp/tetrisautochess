class PlayerField {
  renderEmptyField(height, width) {
    let field = document.getElementsByClassName('PlayerField')[0];

    for (let i = 0; i < height; i++){
      let row = document.createElement('div');
      row.setAttribute('class', 'row');
      row.setAttribute('index', i);

      for (let j = 0; j < width; j++){
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('index', j);
        row.appendChild(cell);
      }

      field.appendChild(row);
    }
  }
}


let newField = new PlayerField();
newField.renderEmptyField(defaultFieldHeight, defaultFieldWidth);

class Figure {

  constructor(position, color){
    // [[rowIndex, cellIndex],[],[]]
    this.position = position;
    this.color = color;
  }

  renderFigure(color = this.color){
    this.position.forEach((item) => {
      let rowIndex = item[0];
      let cellIndex = item[1];
      let cell = document.querySelector(`.row[index="${rowIndex}"]`).querySelector(`.cell[index="${cellIndex}"]`);
      cell.style.backgroundColor = color;
    });
  }

  async move(direction){
    const timer = ms => new Promise(res => setTimeout(res, ms))

    if (direction == "bottom") {
      let closestFigureCellToBottom = Math.max(...this.position.map(coords => coords[0]));
      let lastRowIndex = defaultFieldHeight - 1;
      while (closestFigureCellToBottom < lastRowIndex){
        await timer(defaultFigureSpeed);
        this.renderFigure("gray");
        this.position = this.position.map(coords => [coords[0]+1, coords[1]])
        closestFigureCellToBottom = Math.max(...this.position.map(coords => coords[0]));
        this.renderFigure();
      }
    }

    if (direction == "top") {
      let closestFigureCellToTop = Math.min(...this.position.map(coords => coords[0]));
      console.log(closestFigureCellToTop)
      let firstRowIndex = 0;
      while (closestFigureCellToTop > firstRowIndex){
        await timer(defaultFigureSpeed);
        this.renderFigure("gray");
        this.position = this.position.map(coords => [coords[0]-1, coords[1]])
        closestFigureCellToTop = Math.min(...this.position.map(coords => coords[0]));
        this.renderFigure();
      }
    }
  }
}

let newFigure = new Figure([[9,9],[8,9],[7,9],[6,9]], "red");
newFigure.renderFigure();
newFigure.move("top");

let newFigure2 = new Figure([[0,3],[1,3],[1,4],[0,4]], "green");
newFigure2.renderFigure();
newFigure2.move("bottom");
