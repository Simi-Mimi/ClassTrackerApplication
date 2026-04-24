package com.smartclasstracker.smartclasstracker.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter//lombok
@Setter//lombok
public class StudentLocationDTO {

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
    public StudentLocationDTO() {
    }
    }

