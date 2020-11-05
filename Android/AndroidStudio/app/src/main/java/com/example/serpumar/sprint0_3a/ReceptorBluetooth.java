package com.example.serpumar.sprint0_3a;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.bluetooth.le.ScanSettings;
import android.content.Context;
import android.util.Log;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

public class ReceptorBluetooth {

    LogicaFake lf = new LogicaFake();

    private BluetoothAdapter.LeScanCallback  callbackLeScan = null;

    private ScanCallback scanCallback = null; // for api >= 21

    private String ETIQUETA_LOG = ">>>>";

    private int contador = 0;

    private GPS gps = new GPS();
    ;

    private Context context_;


    //Beacon --> haLlegadoUnBeacon()
    public void haLlegadoUnBeacon(TramaIBeacon tib) {

        Log.d("Contador", "Trama Contador: " + tib.getContador() + " / Contador Guardado: " + contador);

        if(comprobarBeaconRepetido(tib)) {
            int medicion = Utilidades.bytesToInt(tib.getMinor());
            Ubicacion ub = gps.obtenerUbicacion(context_);
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String date = dateFormat.format(Calendar.getInstance().getTime().getTime());

            lf.guardarMedicion(medicion, ub, date, context_); //Le paso como variable el contexto para poder cambiar el texto en la pantalla del MainActivity
        } else {
            Log.d("Medicion", "La medicion ya se ha tomado");
        }


    }

    private boolean comprobarBeaconRepetido(TramaIBeacon tib) {

        if(tib.getContador() == contador){ //Si contador del nuevo trama es igual al contador de anterior medida se devuelve falso
            return false;
        } else {
            contador = tib.getContador();
            return true;
        }

    }


    public void buscarTodosLosDispositivosBTLE() {
        callbackLeScan = new BluetoothAdapter.LeScanCallback() {
            @Override
            public void onLeScan(BluetoothDevice bluetoothDevice, int rssi, byte[] bytes) {

                //
                //  se ha encontrado un dispositivo
                //
                mostrarInformacionDispositivoBTLE( bluetoothDevice, rssi, bytes );

            } // onLeScan()
        }; // new LeScanCallback

        //
        //
        //
        boolean resultado = BluetoothAdapter.getDefaultAdapter().startLeScan( callbackLeScan );

        Log.d(ETIQUETA_LOG, " buscarTodosLosDispositivosBTL(): startLeScan(), resultado= " + resultado );
    } // ()

    /*
    public void buscarEsteDispositivoBTLE(final UUID dispositivoBuscado ) {
        callbackLeScan = new BluetoothAdapter.LeScanCallback() {
            @Override
            public void onLeScan(BluetoothDevice bluetoothDevice, int rssi, byte[] bytes) {

                //
                // dispostivo encontrado
                //

                TramaIBeacon tib = new TramaIBeacon( bytes );
                String uuidString =  Utilidades.bytesToString( tib.getUUID() );

                if ( uuidString.compareTo( Utilidades.uuidToString( dispositivoBuscado ) ) == 0 )  {
                    detenerBusquedaDispositivosBTLE();
                    mostrarInformacionDispositivoBTLE( bluetoothDevice, rssi, bytes );
                    haLlegadoUnBeacon(tib);
                } else {
                    Log.d( ETIQUETA_LOG, " * UUID buscado >" +
                            Utilidades.uuidToString( dispositivoBuscado ) + "< no concuerda con este uuid = >" + uuidString + "<");
                }


            } // onLeScan()
        }; // new LeScanCallback

        //
        //
        //
        BluetoothAdapter.getDefaultAdapter().startLeScan( callbackLeScan );
    } // () */

    public void buscarEsteDispositivoBTLE(final UUID dispositivoBuscado, Context context) {
        context_= context;
        this.scanCallback = new ScanCallback() {
            // Se dispara cada vez que encuentra un dispositivo
            @Override
            public void onScanResult(int callbackType, ScanResult result) {
                // Escaneo de ciclo más alto ya que la app se ejecuta en segundo plano (ahorro de energía)
                super.onScanResult(ScanSettings.SCAN_MODE_LOW_LATENCY, result);
                // Dispostivo encontrado
                byte[] data = result.getScanRecord().getBytes();
                TramaIBeacon tib = new TramaIBeacon(data);
                String strUUIDEncontrado = Utilidades.bytesToString(tib.getUUID());
                Log.d(ETIQUETA_LOG, "API >= 21 - UUID dispositivo encontrado!!!!: " + tib.getUUID().toString());
                if (strUUIDEncontrado.compareTo(Utilidades.uuidToString(dispositivoBuscado))==0) {
                    Log.d("Encontrado", "Dispositivo Encontrado");
                    // Detenemos la búsqueda de dispositivos
                    detenerBusquedaDispositivosBTLE();
                    // Mostramos la información de dispositivo
                    mostrarInformacionDispositivoBTLE(result.getDevice(), result.getRssi(), data);
                    // Tratamos el beacon obtenido
                    haLlegadoUnBeacon(tib);
                } else {
                    Log.d(ETIQUETA_LOG, " * UUID buscado >" + Utilidades.uuidToString(dispositivoBuscado) + "< no concuerda con este uuid = >" + strUUIDEncontrado + "<");
                }
            } // onScanResult()

            // Se dispara si el escaneo falla por otros motivos
            @Override
            public void onScanFailed(int errorCode) {
                super.onScanFailed(errorCode);
                Log.d(ETIQUETA_LOG, "Error de callback con id: " + errorCode);
            } // onScanFailed()
        }; // new scanCallback

// Inicialización callback
        BluetoothAdapter.getDefaultAdapter().getBluetoothLeScanner().startScan(this.scanCallback);
    } // ()


    public void detenerBusquedaDispositivosBTLE() {
        if ( callbackLeScan == null ) {
            return;
        }

        //
        //
        //
        BluetoothAdapter.getDefaultAdapter().stopLeScan(callbackLeScan);
        callbackLeScan = null;
    } // ()

    private void mostrarInformacionDispositivoBTLE( BluetoothDevice bluetoothDevice, int rssi, byte[] bytes) {

        Log.d(ETIQUETA_LOG, " ****************************************************");
        Log.d(ETIQUETA_LOG, " ****** DISPOSITIVO DETECTADO BTLE ****************** ");
        Log.d(ETIQUETA_LOG, " ****************************************************");
        Log.d(ETIQUETA_LOG, " nombre = " + bluetoothDevice.getName());
        Log.d(ETIQUETA_LOG, " dirección = " + bluetoothDevice.getAddress());
        Log.d(ETIQUETA_LOG, " rssi = " + rssi );

        Log.d(ETIQUETA_LOG, " bytes = " + new String(bytes));
        Log.d(ETIQUETA_LOG, " bytes (" + bytes.length + ") = " + Utilidades.bytesToHexString(bytes));

        TramaIBeacon tib = new TramaIBeacon(bytes);

        Log.d(ETIQUETA_LOG, " ----------------------------------------------------");
        Log.d(ETIQUETA_LOG, " prefijo  = " + Utilidades.bytesToHexString(tib.getPrefijo()));
        Log.d(ETIQUETA_LOG, "          advFlags = " + Utilidades.bytesToHexString(tib.getAdvFlags()));
        Log.d(ETIQUETA_LOG, "          advHeader = " + Utilidades.bytesToHexString(tib.getAdvHeader()));
        Log.d(ETIQUETA_LOG, "          companyID = " + Utilidades.bytesToHexString(tib.getCompanyID()));
        Log.d(ETIQUETA_LOG, "          iBeacon type = " + Integer.toHexString(tib.getiBeaconType()));
        Log.d(ETIQUETA_LOG, "          iBeacon length 0x = " + Integer.toHexString(tib.getiBeaconLength()) + " ( "
                + tib.getiBeaconLength() + " ) ");
        Log.d(ETIQUETA_LOG, " uuid  = " + Utilidades.bytesToHexString(tib.getUUID()));
        Log.d(ETIQUETA_LOG, " uuid  = " + Utilidades.bytesToString(tib.getUUID()));
        Log.d(ETIQUETA_LOG, " major  = " + Utilidades.bytesToHexString(tib.getMajor()) + "( "
                + Utilidades.bytesToInt(tib.getMajor()) + " ) ");
        Log.d(ETIQUETA_LOG, " minor  = " + Utilidades.bytesToHexString(tib.getMinor()) + "( "
                + Utilidades.bytesToInt(tib.getMinor()) + " ) ");
        Log.d(ETIQUETA_LOG, " txPower  = " + Integer.toHexString(tib.getTxPower()) + " ( " + tib.getTxPower() + " )");
        Log.d(ETIQUETA_LOG, " ****************************************************");

        Log.d(ETIQUETA_LOG, " ----------------------------------------------------");
        Log.d(ETIQUETA_LOG, "Distancia estimada entre el Sensor: " + obtenerDistanciaEstimadaSensorYDispositivo(tib.getTxPower(), rssi));
        Log.d(ETIQUETA_LOG, " ----------------------------------------------------");

    } // ()

    // <Byte>, <Byte> --> obtenerDistanciaEstimadaSensorYDispositivo() --> <R>
    public double obtenerDistanciaEstimadaSensorYDispositivo(int txPower, int rssi) { //El sensor debe estar emitiendo para poder obtener la distancia estimada

        // Distancia = 10 ^ ((Potencia medida - RSSI) / (10 * N))
        if (rssi == 0) {
            return -1;
        }
        int N = 2; //N = 2 (en espacio libre)
        return Math.pow(10, (double) ((txPower - rssi)/(10*N)));

        /*double ratio = rssi*1.0/txPower;
        if (ratio < 1.0) {
            return Math.pow(ratio,10);
        }
        else {
            return (0.89976)*Math.pow(ratio,7.7095) + 0.111;
        }*/
    }

}
