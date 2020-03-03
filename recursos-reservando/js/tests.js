/*
Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.
Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.
Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.
*/
var expect = chai.expect;

describe("Testeando funcion reservarHorario(horario)", function() {
    it("Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.", function(){
        var restoTest = new Restaurant();
        restoTest.horarios = ["17:00", "19:00", "20:30"]
        var horarioTest = "19:00";
        restoTest.reservarHorario(horarioTest);

       // expect(restoTest.horarios).to.not.include(horarioTest); //Espera que se elimine el horario del arreglo
        expect(restoTest.horarios.length).to.equal(2)
    })
    it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual", function() {
        var restoTest = new Restaurant();
        restoTest.horarios = ["12:00", "15:00", "17:30"];
        var horarioTest = "21:00";
        restoTest.reservarHorario(horarioTest);
        expect(restoTest.horarios.length).to.equal(3);
    })
    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.", function() {
        var restoTest = new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]);
        var horarioTest = restoTest.horarios.length;
        restoTest.reservarHorario();
        expect(restoTest.horarios.length).to.equal(horarioTest);
    })
})
    
// Testeá la función obtenerPuntuación() 

describe("Testeando la función obtenerPuntuación() ", function() {
    it("Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente", function(){
        var restoTest = new Restaurant();
        restoTest.calificaciones = [9, 8, 5, 2, 9];
        expect(restoTest.obtenerPuntuacion()).to.equal(6.6);
    })
    it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0", function(){
        var restoTest = new Restaurant();
        restoTest.calificaciones = [];
        expect(restoTest.obtenerPuntuacion()).to.equal(0)
    })
})
// Testeá la función calificar()  

describe("Testeando la función calificar() ", function() {
    it("Dada una puntuación de 1 a 10, se agrega a la calificación", function(){
        var restoTest = new Restaurant();
        restoTest.calificaciones = [];
        restoTest.calificar(8);
        expect(restoTest.calificaciones.length).to.equal(1);
    })
    it("No dada ninguna puntuación, la calificación se mantiene igual", function(){
        var restoTest = new Restaurant();
        restoTest.calificaciones = [];
        restoTest.calificar();
        expect(restoTest.calificaciones.length).to.equal(0);
    })
})

// Testeá la función buscarRestaurante(id)

describe("Testeando la función buscarRestaurante(id)", function() {
    it("Se elige un id correcto, se muestra el Restaurant", function(){
        // var restoTest = new Restaurant();
        // restoTest.id = [];
        expect(listado.buscarRestaurante(20).nombre).to.equal("Pappelli");
    })
    it("Cuando se busca un id incorrecto, no se muestra nada", function(){
        var restoTest = new Restaurant();
        restoTest.id = [];
        expect(listado.buscarRestaurante(30).id).to.be.undefined;
    })    
})

// Testeá la función obtenerRestaurantes() crea un listado[] dependiendo de los filtros seleccionado 

describe("Testeando la función obtenerRestaurantes()",function(){
    it("Si todos los filtros son correctos, se agrega el restaurant", function(){
        var filtroFeliz = listado.obtenerRestaurantes("Hamburguesa", "Londres", "16:00");
        expect(filtroFeliz.length).to.equal(1);
    })
    it("Si todos los filtros estan vacios, no me devuelve nada", function(){
        var filtroinFeliz = listado.obtenerRestaurantes("", "", "");
        expect(filtroinFeliz.length).to.equal(0);
    })
    it('Si paso todos los parametros nulos, devuelve todos los Restaurantes',function(){
        var sinFiltro = listado.obtenerRestaurantes(null, null, null);
        expect(sinFiltro.length).to.equal(24);
    })
})

// TESTEANDO RESERVA.JS

describe("Testeando la funcionalidad del objeto Reserva ",function(){

    it("Dado determinada cantidadPersonas(8) y precioPorPersona(350) el precioBase se calcula correctamente", function(){
        var reservaUno = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reservaUno.precioBase()).to.equal(2800);
    })
    
    it("Dado determinada cantidadPersonas(8) y precioPorPersona(350) y descuento(DES1) el precioFinal se calcula correctamente", function(){
        var reservaUno = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        // expect(reservaUno.precioFinal()).to.eql(2310) ese valor es incorrecto (es lo que propone la guia)
        expect(reservaUno.precioFinal()).to.equal(2450);
    })

    it("Dado determinada cantidadPersonas(2) y precioPorPersona(150) y descuento(DES200) el adicional se calcula correctamente", function(){
        var reservaDos = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
        expect(reservaDos.precioFinal()).to.equal(100);
    })
})
