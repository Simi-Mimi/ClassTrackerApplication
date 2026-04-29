package com.smartclasstracker.smartclasstracker.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LocationDTO {

    private Long id;
    private Coordinates coordinates;
    private String time;

    @Setter @Getter
    public static class Coordinates {
        private DMS latitude;
        private DMS longitude;
    }

    @Setter @Getter
    public static class DMS {
        private int degrees;
        private int minutes;
        private int seconds;
    }
}

