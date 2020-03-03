var Reserva = function (horarioReserva, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horarioReserva = horarioReserva;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
}

// Desarrollar la funcionalidad que calcule el precio base de una reserva
Reserva.prototype.precioBase = function () {
    return this.cantidadPersonas * this.precioPersona;
}

// Desarrollar la funcionalidad que calcule el precio total de una reserva

Reserva.prototype.precioFinal = function () {

    var precioBase = this.precioBase();
    var adicionales = this.adicionales(precioBase);
    var descuentos = this.descuentos(precioBase);

    return precioBase + adicionales - descuentos;   
}

// Descuentos

Reserva.prototype.descuentos = function (porcentaje) {
    return this.descuentosPorGrupos(porcentaje) + this.descuentosPorCodigo(porcentaje);
}

/*
Descuento por grupos grandes: si la cantidad de personas de la reserva está entre 4 y 6 personas, se agrega un 5% de descuento.
 Para grupos entre de 7 y 8 personas un 10% de descuento y para grupos de más de 8 personas un 15% de descuento. */

Reserva.prototype.descuentosPorGrupos = function (porcentaje) {
    var descuentoUno = 0;
    if(this.cantidadPersonas >= 4 && this.cantidadPersonas <= 6){
        descuentoUno = (porcentaje * 0.05);
    }
    if (this.cantidadPersonas >= 7 && this.cantidadPersonas <= 8) {
        descuentoUno = (porcentaje * 0.10);
    }
    if (this.cantidadPersonas > 8) {
        descuentoUno = (porcentaje * 0.15);
    }
    return descuentoUno;
}

Reserva.prototype.descuentosPorCodigo = function (porcentaje) {
    var descuentoDos = 0;
    if (this.codigoDescuento === "DES15") {
        descuentoDos = (porcentaje * 0.15);
    }
    if (this.codigoDescuento === "DES200") {
        descuentoDos = 200;
    }
    if (this.codigoDescuento === "DES1") {
        descuentoDos = this.precioPersona;
    }
    return descuentoDos;
}

// Adicionales

/*dicional por horario: las franjas horarias de 13 a 14 y de 20 a 21 horas son muy concurridas. 
Se agrega un adicional del 5% si la reserva fue hecha para un horario dentro de esos rangos.
Adicional por fin de semana: si la reserva fue realizada para alguno de los días del fin de semana
 (viernes, sábado o domingo) se le agrega un adicional del 10%.*/

Reserva.prototype.adicionales = function (baseCalculo) {
    return this.adicionalPorFinde(baseCalculo) + this.adicionalPorHora(baseCalculo);
}

Reserva.prototype.adicionalPorFinde = function (base){
    var adicional = 0;
    var diaReserva = this.horarioReserva.getDay();

    if(diaReserva === 5 || diaReserva === 6 || diaReserva === 0) {
        adicional = base * 0.10;
    }
    return adicional;
}
Reserva.prototype.adicionalPorHora = function (base){
    var adicional = 0;
    var horaReserva = this.horarioReserva.getHours();

    if((horaReserva >= 13 && horaReserva <=14) || (horaReserva >= 20 && horaReserva <=21)){
        adicional = base * 0.05;
    }
    return adicional;
}