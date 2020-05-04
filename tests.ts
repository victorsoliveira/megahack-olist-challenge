const stringSimilarity = require('string-similarity');
import * as _ from 'lodash';

let chunk_inefficient = (array, chunkSize) => {
    return [].concat.apply([],
      array.map(function(elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  };

const text = "Informações técnicas\nMarca Motorola\nReferência XT2041-1\nModelo G8 Power\nLinha Moto\n\nCores\nPreto, Azul, Branco e Prata\nMemória interna\n64GB\nInformações da memória interna\nA memória disponível para uso do consumidor pode sofrer variações, conforme sistema operacional, aplicativos e/ou outros fatores\nSuporte ao cartão de memória\nMicroSD até 512GB\nMemória RAM\n4GB\nTamanho da tela\n6,4\"\nTecnologia\n4G\nConectividade\nBluetooth 5.0 - Wi-Fi 802.11 b/g/n\nProcessador\nOcta-Core\nModelo do processador\nQualcomm Snapdragon 665 (SM6125)\nVelocidade do processador\n2.0GHz\nSistema operacional\nAndroid\nVersão do sistema operacional\n10\nQuantidade de chips\nDual Chip\nTipo de chip\nNano\nTela\nResolução da tela FHD+ (1080x2300)\nResolução da câmera traseira\n16MP + 8MP + 8MP + 2MP\nRecursos da câmera traseira\n- Câmera de 16MP: abertura de f/1.7 e lente de 78º - Câmera de 8MP: abertura de f/2.2 e lente de 118º - Câmera de 8MP: abertura de f/2.2 e lente de 45º - Câmera de 2MP: abertura de f/2.2 e lente de 83º\nResolução da câmera frontal\n16MP\nRecursos da câmera frontal\n- Abertura f/2.0 e lente de 73º\nSensores\n- Impressão digital - Acelerômetro - Proximidade - Giroscópio - Magnetômetro - Sensor de luz ambiente\nCapacidade da bateria\n5000mAh\nCarregamento rápido\n18W Turbo Power\nOperadora\nDesbloqueado\n\n\nGarantia\nPrazo de Garantia 01 ano (3 meses de garantia legal e mais 9 meses de garantia especial concedida pelo fabricante).\nConteúdo da embalagem\n- 01 Smartphone - 01 Carregador de parede Turbo Power - 01 Capa protetora - 01 Fone de ouvido estéreo - 01 Cabo de sincronização - 01 Ferramenta de remoção do chip - 01 Kit de manuais";
const text_lines = text.split('\n');
const text_chunks = chunk_inefficient(text_lines, 3);

const attributes = [
  {
    "id": "BATTERY_CAPACITY",
    "name": "Capacidad de la batería",
    "value_id": "98439",
    "value_name": "5000 mAh",
    "value_struct": {
      "number": 5000,
      "unit": "mAh"
    },
    "values": [
      {
        "id": "98439",
        "name": "5000 mAh",
        "struct": {
          "number": 5000,
          "unit": "mAh"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "BATTERY_TYPE",
    "name": "Tipo de batería",
    "value_id": "7573636",
    "value_name": "Polímero de litio",
    "value_struct": null,
    "values": [
      {
        "id": "7573636",
        "name": "Polímero de litio",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "BRAND",
    "name": "Marca",
    "value_id": "2503",
    "value_name": "Motorola",
    "value_struct": null,
    "values": [
      {
        "id": "2503",
        "name": "Motorola",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "CARRIER",
    "name": "Compañía telefónica",
    "value_id": "298335",
    "value_name": "Liberado",
    "value_struct": null,
    "values": [
      {
        "id": "298335",
        "name": "Liberado",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "CPU_MODEL",
    "name": "Modelo de CPU",
    "value_id": "7671212",
    "value_name": "4x2 GHz Kryo 260 Gold/4x1.8 GHz Kryo 260 Silver",
    "value_struct": null,
    "values": [
      {
        "id": "7671212",
        "name": "4x2 GHz Kryo 260 Gold/4x1.8 GHz Kryo 260 Silver",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "DEPTH",
    "name": "Profundidad",
    "value_id": "6172642",
    "value_name": "9.6 mm",
    "value_struct": {
      "number": 9.6,
      "unit": "mm"
    },
    "values": [
      {
        "id": "6172642",
        "name": "9.6 mm",
        "struct": {
          "number": 9.6,
          "unit": "mm"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "DIGITAL_ZOOM",
    "name": "Zoom digital",
    "value_id": "1339",
    "value_name": "8x",
    "value_struct": {
      "number": 8,
      "unit": "x"
    },
    "values": [
      {
        "id": "1339",
        "name": "8x",
        "struct": {
          "number": 8,
          "unit": "x"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "DISPLAY_RESOLUTION",
    "name": "Resolución de la pantalla",
    "value_id": "8202804",
    "value_name": "1080 px x 2300 px",
    "value_struct": null,
    "values": [
      {
        "id": "8202804",
        "name": "1080 px x 2300 px",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "DISPLAY_SIZE",
    "name": "Tamaño de la pantalla",
    "value_id": "7024668",
    "value_name": "6.4 \"",
    "value_struct": {
      "number": 6.4,
      "unit": "\""
    },
    "values": [
      {
        "id": "7024668",
        "name": "6.4 \"",
        "struct": {
          "number": 6.4,
          "unit": "\""
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "FRONT_CAMERAS_NUMBER",
    "name": "Número de cámaras frontales",
    "value_id": "7477216",
    "value_name": "1",
    "value_struct": null,
    "values": [
      {
        "id": "7477216",
        "name": "1",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "FRONT_CAMERA_APERTURE",
    "name": "Apertura del diafragma de la cámara frontal",
    "value_id": "7408577",
    "value_name": "f 2.0",
    "value_struct": null,
    "values": [
      {
        "id": "7408577",
        "name": "f 2.0",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "FRONT_CAMERA_RECORDING_RESOLUTION",
    "name": "Resolución de video de la cámara frontal",
    "value_id": "7173215",
    "value_name": "1920 px x 1080 px",
    "value_struct": null,
    "values": [
      {
        "id": "7173215",
        "name": "1920 px x 1080 px",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "GPU_MODEL",
    "name": "Modelo de GPU",
    "value_id": "7671213",
    "value_name": "Adreno 610",
    "value_struct": null,
    "values": [
      {
        "id": "7671213",
        "name": "Adreno 610",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "HEIGHT",
    "name": "Altura",
    "value_id": "2862675",
    "value_name": "158 mm",
    "value_struct": {
      "number": 158,
      "unit": "mm"
    },
    "values": [
      {
        "id": "2862675",
        "name": "158 mm",
        "struct": {
          "number": 158,
          "unit": "mm"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "INTERNAL_MEMORY",
    "name": "Memoria interna",
    "value_id": "59726",
    "value_name": "64 GB",
    "value_struct": {
      "number": 64,
      "unit": "GB"
    },
    "values": [
      {
        "id": "59726",
        "name": "64 GB",
        "struct": {
          "number": 64,
          "unit": "GB"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "IS_DUAL_SIM",
    "name": "Es Dual SIM",
    "value_id": "242084",
    "value_name": "No",
    "value_struct": null,
    "values": [
      {
        "id": "242084",
        "name": "No",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "IS_SPLASH_RESISTANT",
    "name": "Es resistente a salpicaduras",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "IS_WATERPROOF",
    "name": "Es a prueba de agua",
    "value_id": "242084",
    "value_name": "No",
    "value_struct": null,
    "values": [
      {
        "id": "242084",
        "name": "No",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "IS_WATER_RESISTANT",
    "name": "Es resistente al agua",
    "value_id": "242084",
    "value_name": "No",
    "value_struct": null,
    "values": [
      {
        "id": "242084",
        "name": "No",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "ITEM_CONDITION",
    "name": "Condición del ítem",
    "value_id": "2230284",
    "value_name": "Nuevo",
    "value_struct": null,
    "values": [
      {
        "id": "2230284",
        "name": "Nuevo",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "LINE",
    "name": "Línea",
    "value_id": "3073863",
    "value_name": "Moto G",
    "value_struct": null,
    "values": [
      {
        "id": "3073863",
        "name": "Moto G",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "MAIN_FRONT_CAMERA_RESOLUTION",
    "name": "Resolución de la cámara frontal principal",
    "value_id": "7209665",
    "value_name": "16 Mpx",
    "value_struct": {
      "number": 16,
      "unit": "Mpx"
    },
    "values": [
      {
        "id": "7209665",
        "name": "16 Mpx",
        "struct": {
          "number": 16,
          "unit": "Mpx"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "MAIN_REAR_CAMERA_RESOLUTION",
    "name": "Resolución de la cámara trasera principal",
    "value_id": "7207095",
    "value_name": "16 Mpx",
    "value_struct": {
      "number": 16,
      "unit": "Mpx"
    },
    "values": [
      {
        "id": "7207095",
        "name": "16 Mpx",
        "struct": {
          "number": 16,
          "unit": "Mpx"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "MAX_MEMORY_CARD_CAPACITY",
    "name": "Capacidad máxima de la tarjeta de memoria",
    "value_id": "6901713",
    "value_name": "512 GB",
    "value_struct": {
      "number": 512,
      "unit": "GB"
    },
    "values": [
      {
        "id": "6901713",
        "name": "512 GB",
        "struct": {
          "number": 512,
          "unit": "GB"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "MEMORY_CARD_TYPES",
    "name": "Tipos de tarjeta de memoria",
    "value_id": "7199655",
    "value_name": "microSD",
    "value_struct": null,
    "values": [
      {
        "id": "7199655",
        "name": "microSD",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "MOBILE_NETWORK",
    "name": "Red",
    "value_id": "367876",
    "value_name": "4G/LTE",
    "value_struct": null,
    "values": [
      {
        "id": "367876",
        "name": "4G/LTE",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "MODEL",
    "name": "Modelo",
    "value_id": "8202803",
    "value_name": "G8 Power",
    "value_struct": null,
    "values": [
      {
        "id": "8202803",
        "name": "G8 Power",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "NUMBER_OF_SIM_CARD_SLOTS",
    "name": "Cantidad de ranuras para tarjeta SIM",
    "value_id": "2087812",
    "value_name": "1",
    "value_struct": null,
    "values": [
      {
        "id": "2087812",
        "name": "1",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "OPERATING_SYSTEM_NAME",
    "name": "Nombre del sistema operativo",
    "value_id": "7403813",
    "value_name": "Android",
    "value_struct": null,
    "values": [
      {
        "id": "7403813",
        "name": "Android",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "OPERATING_SYSTEM_VERSION",
    "name": "Versión del sistema operativo",
    "value_id": "4743197",
    "value_name": "10",
    "value_struct": null,
    "values": [
      {
        "id": "4743197",
        "name": "10",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "OPTICAL_ZOOM",
    "name": "Zoom óptico",
    "value_id": "1344",
    "value_name": "2x",
    "value_struct": {
      "number": 2,
      "unit": "x"
    },
    "values": [
      {
        "id": "1344",
        "name": "2x",
        "struct": {
          "number": 2,
          "unit": "x"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "PIXELS_PER_INCH",
    "name": "Píxeles por pulgada",
    "value_id": "8202806",
    "value_name": "399 ppi",
    "value_struct": {
      "number": 399,
      "unit": "ppi"
    },
    "values": [
      {
        "id": "8202806",
        "name": "399 ppi",
        "struct": {
          "number": 399,
          "unit": "ppi"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "PROCESSOR_CORES_NUMBER",
    "name": "Cantidad de núcleos del procesador",
    "value_id": "7206961",
    "value_name": "8",
    "value_struct": null,
    "values": [
      {
        "id": "7206961",
        "name": "8",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "PROCESSOR_MODEL",
    "name": "Modelo del procesador",
    "value_id": "7671215",
    "value_name": "Snapdragon 665",
    "value_struct": null,
    "values": [
      {
        "id": "7671215",
        "name": "Snapdragon 665",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "PROCESSOR_SPEED",
    "name": "Velocidad del procesador",
    "value_id": "365995",
    "value_name": "2 GHz",
    "value_struct": {
      "number": 2,
      "unit": "GHz"
    },
    "values": [
      {
        "id": "365995",
        "name": "2 GHz",
        "struct": {
          "number": 2,
          "unit": "GHz"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "RAM",
    "name": "Memoria RAM",
    "value_id": "98852",
    "value_name": "4 GB",
    "value_struct": {
      "number": 4,
      "unit": "GB"
    },
    "values": [
      {
        "id": "98852",
        "name": "4 GB",
        "struct": {
          "number": 4,
          "unit": "GB"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "REAR_CAMERAS_NUMBER",
    "name": "Número de cámaras traseras",
    "value_id": "7505958",
    "value_name": "4",
    "value_struct": null,
    "values": [
      {
        "id": "7505958",
        "name": "4",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "REAR_CAMERAS_RESOLUTION",
    "name": "Resolución de las cámaras traseras",
    "value_id": "8202808",
    "value_name": "16 Mpx/8 Mpx/8 Mpx/2 Mpx",
    "value_struct": null,
    "values": [
      {
        "id": "8202808",
        "name": "16 Mpx/8 Mpx/8 Mpx/2 Mpx",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "REAR_CAMERA_APERTURE",
    "name": "Apertura del diafragma de la cámara trasera",
    "value_id": "8202805",
    "value_name": "f 1.7/f 2.2/f 2.2/f 2.2",
    "value_struct": null,
    "values": [
      {
        "id": "8202805",
        "name": "f 1.7/f 2.2/f 2.2/f 2.2",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "REAR_CAMERA_RECORDING_RESOLUTION",
    "name": "Resolución de video de la cámara trasera",
    "value_id": "7199630",
    "value_name": "3840 px x 2160 px",
    "value_struct": null,
    "values": [
      {
        "id": "7199630",
        "name": "3840 px x 2160 px",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "RELEASE_YEAR",
    "name": "Año de lanzamiento",
    "value_id": "7885601",
    "value_name": "2020",
    "value_struct": null,
    "values": [
      {
        "id": "7885601",
        "name": "2020",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "SCREEN_TECHNOLOGY",
    "name": "Tecnología de pantalla",
    "value_id": "80490",
    "value_name": "IPS",
    "value_struct": null,
    "values": [
      {
        "id": "80490",
        "name": "IPS",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "SIM_SIZES",
    "name": "Tamaños de tarjeta SIM compatibles",
    "value_id": "80453",
    "value_name": "Nano-SIM",
    "value_struct": null,
    "values": [
      {
        "id": "80453",
        "name": "Nano-SIM",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WEIGHT",
    "name": "Peso",
    "value_id": "1095137",
    "value_name": "195 g",
    "value_struct": {
      "number": 195,
      "unit": "g"
    },
    "values": [
      {
        "id": "1095137",
        "name": "195 g",
        "struct": {
          "number": 195,
          "unit": "g"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WIDTH",
    "name": "Ancho",
    "value_id": "6964432",
    "value_name": "75.8 mm",
    "value_struct": {
      "number": 75.8,
      "unit": "mm"
    },
    "values": [
      {
        "id": "6964432",
        "name": "75.8 mm",
        "struct": {
          "number": 75.8,
          "unit": "mm"
        }
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_ACCELEROMETER",
    "name": "Con acelerómetro",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_BLUETOOTH",
    "name": "Con Bluetooth",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_CAMERA",
    "name": "Con cámara",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_ESIM",
    "name": "Con eSIM",
    "value_id": "242084",
    "value_name": "No",
    "value_struct": null,
    "values": [
      {
        "id": "242084",
        "name": "No",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_FACIAL_RECOGNITION",
    "name": "Con reconocimiento facial",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_FINGERPRINT_READER",
    "name": "Con lector de huella digital",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_FRONT_CAMERA_FLASH",
    "name": "Con flash en la cámara frontal",
    "value_id": "242084",
    "value_name": "No",
    "value_struct": null,
    "values": [
      {
        "id": "242084",
        "name": "No",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_GPS",
    "name": "Con GPS",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_GYROSCOPE",
    "name": "Con giroscopio",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_IMEI",
    "name": "Con IMEI",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_MINI_HDMI",
    "name": "Con mini HDMI",
    "value_id": "242084",
    "value_name": "No",
    "value_struct": null,
    "values": [
      {
        "id": "242084",
        "name": "No",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_PHYSICAL_QWERTY_KEYBOARD",
    "name": "Con teclado QWERTY físico",
    "value_id": "242084",
    "value_name": "No",
    "value_struct": null,
    "values": [
      {
        "id": "242084",
        "name": "No",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_PROXIMITY_SENSOR",
    "name": "Con sensor de proximidad",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_RADIO",
    "name": "Con radio",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_REMOVABLE_BATTERY",
    "name": "Con batería removible",
    "value_id": "242084",
    "value_name": "No",
    "value_struct": null,
    "values": [
      {
        "id": "242084",
        "name": "No",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_SLOW_MOTION_CAMERA_FUNCTION",
    "name": "Con función de cámara lenta",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_TOUCH_SCREEN",
    "name": "Con pantalla táctil",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_TV_TUNER",
    "name": "Con sintonizador de TV",
    "value_id": "242084",
    "value_name": "No",
    "value_struct": null,
    "values": [
      {
        "id": "242084",
        "name": "No",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_USB_CONNECTOR",
    "name": "Con conector USB",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  },
  {
    "id": "WITH_WIFI",
    "name": "Con Wi-Fi",
    "value_id": "242085",
    "value_name": "Sí",
    "value_struct": null,
    "values": [
      {
        "id": "242085",
        "name": "Sí",
        "struct": null
      }
    ],
    "attribute_group_id": "OTHERS",
    "attribute_group_name": "Otros"
  }
];

var sanitizedAttributes = attributes.map(x=> {
  x.id = x.id.toLowerCase().replace(/[_]/gi, ' ').replace(/[-]/gi, '');
  x['sanitizedName']= x.name.toLowerCase().replace(/[?.,;:|!_-]/gi, '');
  x['orderedSanitizedName'] = _.orderBy(x['sanitizedName'].split(' ')).join(' ');
  return x;
});

var question = 'como é o zoom ótico?'.toLowerCase().replace(/[?.,;:|!_-]/gi, '');
var tokens = question.split(' ');

var phrase = [];

tokens.forEach(t => {

  const matches = stringSimilarity.findBestMatch(t, sanitizedAttributes.map(x => x['sanitizedName'] ));

  if (matches.bestMatch.rating > 0.4) {
    console.log(matches.bestMatch);
    phrase.push(t);
  }

});

var newQuestion = _.orderBy(phrase).join(' ');

console.log(newQuestion);

const newMatches = stringSimilarity.findBestMatch(newQuestion, sanitizedAttributes.map(x => x['orderedSanitizedName'] ));

if (newMatches.bestMatch.rating >= 0.4){
  console.log(newMatches.bestMatch);

  let foundAttr = sanitizedAttributes.find(x=> x['orderedSanitizedName'] === newMatches.bestMatch.target);
  console.log(`Você perguntou por  "${foundAttr.name}" ?  Nesse caso o valor do "${foundAttr.name}" é "${foundAttr.value_name}" ! Caso não tenha atendido a sua expectativa tente ser mais específico(a) por favor.`);
}