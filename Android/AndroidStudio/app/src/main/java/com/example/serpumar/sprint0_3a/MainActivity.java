// ------------------------------------------------------------------
// ------------------------------------------------------------------

package com.example.serpumar.sprint0_3a;

// ------------------------------------------------------------------
// ------------------------------------------------------------------
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

// ------------------------------------------------------------------
// ------------------------------------------------------------------

public class MainActivity extends AppCompatActivity {

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    private static String ETIQUETA_LOG = ">>>>";
    private ReceptorBluetooth receptorBluetooth = new ReceptorBluetooth();

    private GPS gps = new GPS();
    private LogicaFake lf;


    // --------------------------------------------------------------
    // --------------------------------------------------------------
    public void botonBuscarDispositivosBTLEPulsado( View v ) {
        Log.d(ETIQUETA_LOG, " boton buscar dispositivos BTLE Pulsado" );
        receptorBluetooth.buscarTodosLosDispositivosBTLE();

    } // ()

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    public void botonBuscarNuestroDispositivoBTLEPulsado( View v ) {
        Log.d(ETIQUETA_LOG, "-- boton nuestro dispositivo BTLE Pulsado" );
        receptorBluetooth.buscarEsteDispositivoBTLE( Utilidades.stringToUUID( "GRUP3-GTI-PROY-3" ), this );

    } // ()

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    public void botonDetenerBusquedaDispositivosBTLEPulsado( View v ) {
        Log.d(ETIQUETA_LOG, " boton nuestro dispositivo BTLE Detenido" );
        receptorBluetooth.detenerBusquedaDispositivosBTLE();
    } // ()


    // --------------------------------------------------------------
    // --------------------------------------------------------------
    public void botonObtenerMedicionDeBDD( View v ) {
        Log.d(ETIQUETA_LOG, " boton obtener medicion bdd" );
        lf.obtenerMediciones();

    } // ()

    // --------------------------------------------------------------
    // --------------------------------------------------------------
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        lf= new LogicaFake(this);
        lf.login("David", "ContraseñaHasheada");
    } // onCreate()

} // class
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------
// --------------------------------------------------------------

