// -*- mode: c++ -*-

#ifndef MEDIDOR_H_INCLUIDO
#define MEDIDOR_H_INCLUIDO

// ------------------------------------------------------
// ------------------------------------------------------
class Medidor {

    /*
      Private:
      sensorData: [Z]
      leer11Datos() (Consulta) (Modifica sensorData: [Z])
    */

    // .....................................................
    // .....................................................
  private:

    int sensorData [11];
    
    void leer11Datos(void)
    {
      int i = 0;
      for (int i = 0; i < 11; i++) {
        //while (!Serial1.available()) { }
        while ( !Serial1 ) delay(10);
        sensorData[i] = Serial1.parseInt();
        //SN [XXXXXXXXXXXX], PPB [0 : 999999], TEMP [-99 : 99],
        //RH [0 :99], RawSensor[ADCCount], TempDigital, RHDigital,
        //Day [0 : 99], Hour [0 : 23], Minute [0 : 59], Second [0 : 59]
      }
    }


  public:

    // .....................................................
    // constructor
    // .....................................................
    Medidor() { //Se le podria pasar como parametro los Baudios para el Serial1.Begin()
      //Para Serial1
    } // ()

    // .....................................................
    // .....................................................
    void iniciarMedidor(long baudios) {
      // las cosas que no se puedan hacer en el constructor, if any
      Serial1.begin(baudios);
    } // ()

    // .....................................................
    // .....................................................
    int medirIrritante() {
      Serial1.print('\r'); // Inicia una lectura del sensor. Ahora hay que espera a que nos envíe algo de vuelta!
      leer11Datos();
      return sensorData[1];
    } // ()

    // .....................................................
    // .....................................................
    int medirTemperatura() {
      Serial1.print('\r'); // Inicia una lectura del sensor. Ahora hay que espera a que nos envíe algo de vuelta!
      leer11Datos();
      return sensorData[5];
    } // ()

}; // class

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
#endif
