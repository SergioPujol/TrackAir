package com.example.serpumar.sprint0_3a;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.example.serpumar.sprint0_3a.ClasesPojo.Ubicacion;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;

public class GPS {

    /*public Ubicacion obtenerUbicacion(Context context) {

        //requestPermission(context);

        client = LocationServices.getFusedLocationProviderClient(context);

        if(ActivityCompat.checkSelfPermission(context, ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            requestPermission(context);
            Log.d("Ubicacion", "ENTRA SI NO TIENES PERMISO");
        }

        client.getLastLocation().addOnSuccessListener((Activity) context, new OnSuccessListener<Location>() {
            @Override
            public void onSuccess(Location location) {
                if(location != null) {
                    lat = location.getLatitude();
                    longi = location.getLongitude();
                }
            }
        });

        return new Ubicacion(lat, longi);
    }*/


    public Ubicacion obtenerUbicacion(Context context) {
        Ubicacion ub;

        if(obtenerLocation(context) != null) {
            ub = new Ubicacion(obtenerLocation(context).getLatitude(), obtenerLocation(context).getLongitude());
        } else {
            return null;
        }
        return ub;
    }



    private Location obtenerLocation(Context context) {

        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        if (locationManager != null) {
        
        if (ContextCompat.checkSelfPermission( context,android.Manifest.permission.ACCESS_COARSE_LOCATION ) != PackageManager.PERMISSION_GRANTED )
        {
            ActivityCompat.requestPermissions((Activity)context, new String[] {ACCESS_FINE_LOCATION}, 1);
        }
        try {
            Location lastKnownLocationGPS = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
            if (lastKnownLocationGPS != null) {
                return lastKnownLocationGPS;
            } else {
                Location loc = locationManager.getLastKnownLocation(LocationManager.PASSIVE_PROVIDER);
                return loc;
            }
        } catch (Exception e) {
            Log.e("Error","Se solicitan permisos");
            return null;
        }
    } else {
        return null;
    }
}

}
