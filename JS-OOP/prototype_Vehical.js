function Vehical(speed) {
  this.speed = speed;
}

Vehical.prototype.move = function () {
  this.speed++;
  console.log(this.speed);
};

Vehical.prototype.openDoor = function () {
  if (this.NumberOfOpenDoors >= this.doorsCount) {
    console.log('все двери открыты')
  } else {
    console.log('Дверь открыта,' + ' количество открытых дверей:' + ++this.NumberOfOpenDoors);
    console.log('закрыто ' + --this.NumberOfCloseDoors);
  }
}

Vehical.prototype.closeDoor = function () {
  if (this.NumberOfCloseDoors >= this.doorsCount) {
    console.log('все двери закрыты')
  } else {
    console.log('Дверь закрыта,' + ' количество закрытых дверей:' + ++this.NumberOfCloseDoors);
  }
}

Vehical.prototype.stop = function () {
  this.speed = 0;
  console.log(' остановка');
};

function Bike(speed) {
  this.speed = speed;
  this.wheelsCount = 2;
}

Car.count = 0

function Car(speed) {
  this.speed = speed;
  this.wheelsCount = 4;
  this.doorsCount = 4;
  this.NumberOfOpenDoors = 0;
  this.NumberOfCloseDoors = this.doorsCount;
  Car.count++;
}

function MonsterTruck(speed) {
  this.speed = speed;
  this.wheelsCount = 2;
  this.doorsCount = 2;
  this.wheelsSize = 66;
  this.NumberOfOpenDoors = 0;
  this.NumberOfCloseDoors = this.doorsCount;
}

Bike.prototype = Object.create(Vehical.prototype);
Bike.prototype.constructor = Bike;
Car.prototype = Object.create(Vehical.prototype);
Car.prototype.constructor = Car;
MonsterTruck.prototype = Object.create(Vehical.prototype);
MonsterTruck.prototype.constructor = MonsterTruck;

var bike = new Bike('15');
var car = new Car('25');
var car2 = new Car('25');
var monsterTruck = new MonsterTruck('10');

Bike.prototype.move = function () {
  Vehical.prototype.move.call(this, null);
  console.log('vroom-vroom');
}

MonsterTruck.prototype.closeDoor = function () {
  setTimeout(Vehical.prototype.openDoor.bind(this, null), 1000);
}

Bike.prototype.toString = function () {
  var ret = 'Bike,' + ' скорость = ' + this.speed +
    ' количество колес = ' + this.wheelsCount;
  return ret;
}

Car.prototype.toString = function () {
  var ret = 'Car,' + ' скорость = ' + this.speed + ' количество колес = ' +
    this.wheelsCount + ' количество дверей = ' + this.doorsCount +
    ' количество открытых дверей = ' + this.NumberOfOpenDoors +
    ' количество закрытых дверей = ' + this.NumberOfCloseDoors;
  return ret;
}

MonsterTruck.prototype.toString = function () {
  var ret = 'MonsterTruck,' + ' скорость = ' + this.speed +
    ' количество колес = ' + this.wheelsCount + ' размер колеса = ' +
    this.wheelsSize + ' количество дверей = ' + this.doorsCount +
    ' количество открытых дверей = ' + this.NumberOfOpenDoors +
    ' количество закрытых дверей = ' + this.NumberOfCloseDoors;
  return ret;
}

Bike.prototype.valueOf = function () {
  var ret = ' скорость: ' + this.speed +
    ' количество колес: ' + this.wheelsCount;
  return ret;
}

Car.prototype.valueOf = function () {
  var ret = ' скорость: ' + this.speed + ' количество колес : ' +
    this.wheelsCount + ' количество дверей: ' + this.doorsCount +
    ' количество открытых дверей :' + this.NumberOfOpenDoors +
    ' количество закрытых дверей :' + this.NumberOfCloseDoors;
  return ret;
}

MonsterTruck.prototype.valueOf = function () {
  var ret = ' скорость: ' + this.speed +
    ' количество колес: ' + this.wheelsCount + ' размер колеса: ' +
    this.wheelsSize + ' количество дверей: ' + this.doorsCount +
    ' количество открытых дверей: ' + this.NumberOfOpenDoors +
    ' количество закрытых дверей: ' + this.NumberOfCloseDoors;
  return ret;
}

bike.move();
car.openDoor();
car.closeDoor();
monsterTruck.closeDoor();

console.log(bike.toString());
console.log(bike.valueOf());
console.log('Счетчик созданных объектов класса Car: ' + Car.count)
