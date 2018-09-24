function Vehical(speed) {
  this.speed = speed;

  this.move = function () {
    this.speed++;
    console.log(this.speed);
  };

  this.openDoor = function () {
    if (this.NumberOfOpenDoors >= this.doorsCount) {
      console.log('все двери открыты')
    } else {
      console.log('Дверь открыта,' + ' количество открытых дверей:' + ++this.NumberOfOpenDoors);
      console.log('закрыто ' + --this.NumberOfCloseDoors);
    }
  }

  this.closeDoor = function () {
    if (this.NumberOfCloseDoors >= this.doorsCount) {
      console.log('все двери закрыты')
    } else {
      console.log('Дверь закрыта,' + ' количество закрытых дверей:' + ++this.NumberOfCloseDoors);
    }
  }

  this.stop = function () {
    this.speed = 0;
    console.log(' остановка');
  };
}

function Bike(speed) {
  Vehical.apply(this, arguments);
  this.speed = speed;
  this.wheelsCount = 2;
  var parentMove = this.move;
  this.move = function (args) {
    parentMove.call(this, args);
    console.log('vroom-vroom');
  }

  this.toString = function () {
    var ret = 'Bike,' + ' скорость = ' + this.speed +
      ' количество колес = ' + this.wheelsCount;
    return ret;
  }

  this.valueOf = function () {
    var ret = ' скорость: ' + this.speed +
      ' количество колес: ' + this.wheelsCount;
    return ret;
  }
}

Car.count = 0

function Car(speed) {
  Vehical.apply(this, arguments);
  this.speed = speed;
  this.wheelsCount = 4;
  this.doorsCount = 4;
  this.NumberOfOpenDoors = 0;
  this.NumberOfCloseDoors = this.doorsCount;
  Car.count++;

  this.toString = function () {
    var ret = 'Car,' + ' скорость = ' + this.speed + ' количество колес = ' +
      this.wheelsCount + ' количество дверей = ' + this.doorsCount +
      ' количество открытых дверей = ' + this.NumberOfOpenDoors +
      ' количество закрытых дверей = ' + this.NumberOfCloseDoors;
    return ret;
  }

  this.valueOf = function () {
    var ret = ' скорость: ' + this.speed + ' количество колес : ' +
      this.wheelsCount + ' количество дверей: ' + this.doorsCount +
      ' количество открытых дверей :' + this.NumberOfOpenDoors +
      ' количество закрытых дверей :' + this.NumberOfCloseDoors;
    return ret;
  }
}

function MonsterTruck(speed) {
  Vehical.apply(this, arguments);
  this.speed = speed;
  this.wheelsCount = 2;
  this.doorsCount = 2;
  this.wheelsSize = 66;
  this.NumberOfOpenDoors = 0;
  this.NumberOfCloseDoors = this.doorsCount;
  var parentCloseDoor = this.closeDoor;
  this.closeDoor = function () {
    setTimeout(parentCloseDoor.bind(this, null), 1000);
  }

  this.toString = function () {
    var ret = 'MonsterTruck,' + ' скорость = ' + this.speed +
      ' количество колес = ' + this.wheelsCount + ' размер колеса = ' +
      this.wheelsSize + ' количество дверей = ' + this.doorsCount +
      ' количество открытых дверей = ' + this.NumberOfOpenDoors +
      ' количество закрытых дверей = ' + this.NumberOfCloseDoors;
    return ret;
  }

  this.valueOf = function () {
    var ret = ' скорость: ' + this.speed +
      ' количество колес: ' + this.wheelsCount + ' размер колеса: ' +
      this.wheelsSize + ' количество дверей: ' + this.doorsCount +
      ' количество открытых дверей: ' + this.NumberOfOpenDoors +
      ' количество закрытых дверей: ' + this.NumberOfCloseDoors;
    return ret;
  }
}

var bike = new Bike('15');
var car = new Car('25');
var car2 = new Car('25');
var monsterTruck = new MonsterTruck('10');

bike.move();
car.openDoor();
car.closeDoor();
monsterTruck.openDoor();
monsterTruck.closeDoor();

console.log(bike.toString());
console.log(bike.valueOf());
console.log('Счетчик созданных объектов класса Car: ' + Car.count)
