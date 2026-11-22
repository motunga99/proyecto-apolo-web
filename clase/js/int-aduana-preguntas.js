// Preguntas oficiales de Mercancías: aduana, tránsito, TIR y ATA.
// paso = número de paso del capítulo 5 de Internacional que la explica.
export const PREGUNTAS_ADUANA = [
  {
    "enunciado": "En España, ¿hay que formular declaración aduanera para la importación de mercancías procedentes de Ceuta o Melilla?",
    "opciones": [
      "No.",
      "Sí.",
      "Solo para la importación de productos electrónicos.",
      "Solo cuando la mercancía está producida o fabricada fuera del Estado español."
    ],
    "correcta": 1,
    "veces": 7,
    "explicacion": "<b>Sí</b>: Ceuta y Melilla están fuera del territorio aduanero.",
    "paso": 1
  },
  {
    "enunciado": "En lo que se refiere a España, forma parte del territorio aduanero de la Unión Europea:",
    "opciones": [
      "todo el territorio del Estado español.",
      "todo el territorio del Estado español, salvo Ceuta y Melilla.",
      "todo el territorio del Estado español, salvo Ceuta, Melilla y las Islas Canarias.",
      "todo el territorio del Estado español, salvo Ceuta, Melilla, las Islas Canarias y las Islas Baleares."
    ],
    "correcta": 1,
    "veces": 7,
    "explicacion": "Todo el territorio de España <b>menos Ceuta y Melilla</b>.",
    "paso": 1
  },
  {
    "enunciado": "¿Qué consideración tiene, a efectos aduaneros, una mercancía obtenida totalmente en Melilla?",
    "opciones": [
      "Se considera mercancía de la Unión, igual a todos los efectos que si hubiera sido obtenida en otro punto del Estado español.",
      "Se considera mercancía de la Unión con estatuto especial.",
      "Se considera mercancía no perteneciente a la Unión.",
      "Depende del tipo de mercancía de que se trate."
    ],
    "correcta": 2,
    "veces": 6,
    "explicacion": "Lo hecho totalmente en Melilla se considera mercancía <b>no perteneciente a la Unión</b>.",
    "paso": 1
  },
  {
    "enunciado": "¿Qué estatuto aduanero tienen las mercancías no pertenecientes a la Unión una vez que han sido despachadas a libre práctica?",
    "opciones": [
      "Adquieren el estatuto de mercancías de la Unión.",
      "Adquieren el estatuto de mercancías expedidas.",
      "Adquieren el estatuto de mercancías importadas.",
      "Mantienen el estatuto de mercancías no pertenecientes a la Unión."
    ],
    "correcta": 0,
    "veces": 9,
    "explicacion": "Después del despacho a libre práctica pasan a ser <b>mercancías de la Unión</b>.",
    "paso": 2
  },
  {
    "enunciado": "¿Qué estatuto aduanero tienen las mercancías que se encuentran en territorio aduanero de la Unión Europea?",
    "opciones": [
      "Siempre se consideran mercancías de la Unión.",
      "Se consideran mercancías de la Unión, salvo que se demuestre lo contrario.",
      "Siempre se consideran mercancías no pertenecientes a la Unión.",
      "Se consideran mercancías no pertenecientes a la Unión, salvo que se demuestre lo contrario."
    ],
    "correcta": 1,
    "veces": 9,
    "explicacion": "Se consideran de la Unión, <b>salvo que se demuestre lo contrario</b>.",
    "paso": 2
  },
  {
    "enunciado": "¿Cuál de las siguientes se considera mercancía no perteneciente a la Unión a efectos aduaneros?",
    "opciones": [
      "La importada de territorios que no forman parte del territorio aduanero de la Unión y despachada a libre práctica.",
      "La obtenida totalmente en el territorio aduanero de la Unión, sin agregación de mercancías importadas.",
      "La mercancía de la Unión que salga del territorio aduanero de esta.",
      "Las respuestas A y C son correctas."
    ],
    "correcta": 2,
    "veces": 9,
    "explicacion": "La mercancía de la Unión <b>que sale</b> del territorio pasa a ser no perteneciente a la Unión.",
    "paso": 2
  },
  {
    "enunciado": "¿Cuál de las siguientes se considera mercancía de la Unión a efectos aduaneros?",
    "opciones": [
      "La obtenida totalmente en el territorio aduanero de la Unión, sin agregación de mercancías importadas.",
      "La importada de territorios que no forman parte del territorio aduanero de la Unión y que haya sido despachada a libre práctica.",
      "La obtenida en el territorio aduanero de la Unión a partir de las mencionadas en los apartados anteriores.",
      "Todas las respuestas son correctas."
    ],
    "correcta": 3,
    "veces": 6,
    "explicacion": "Las tres formas son mercancía de la Unión: <b>todas</b>.",
    "paso": 2
  },
  {
    "enunciado": "¿Cuál de las siguientes se considera mercancía de la Unión a efectos aduaneros?",
    "opciones": [
      "La obtenida totalmente en el territorio aduanero de la Unión.",
      "La obtenida totalmente en cualquier parte del territorio de algún Estado miembro de la Unión Europea.",
      "La obtenida totalmente en el territorio de algún Estado miembro de la Unión Europea o en Islandia, Noruega o Liechtenstein.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 0,
    "veces": 4,
    "explicacion": "Es de la Unión la obtenida <b>totalmente en el territorio aduanero de la Unión</b>.",
    "paso": 2
  },
  {
    "enunciado": "Las mercancías de la Unión que sean reintroducidas en el territorio aduanero de la Unión Europea después de haber sido exportadas, ¿se seguirán considerando como tales a efectos aduaneros?",
    "opciones": [
      "Sí.",
      "Sí, solo si no han transcurrido más de treinta días desde su salida.",
      "No.",
      "Depende del tipo de mercancía."
    ],
    "correcta": 2,
    "veces": 4,
    "explicacion": "<b>No</b>: si salieron y vuelven, ya no se consideran de la Unión.",
    "paso": 2
  },
  {
    "enunciado": "¿Cuál de las siguientes se considera mercancía de la Unión a efectos aduaneros?",
    "opciones": [
      "La obtenida totalmente en el territorio aduanero de la Unión Europea, sin agregación de mercancías importadas.",
      "La obtenida en el territorio aduanero de la Unión, con una agregación máxima de mercancías importadas que no supere el 5 %.",
      "La obtenida en el territorio aduanero de la Unión, con una agregación máxima de mercancías importadas que no supere el 10 %.",
      "La obtenida en el territorio aduanero de la Unión, con una agregación máxima de mercancías importadas que no supere el 15 %."
    ],
    "correcta": 0,
    "veces": 4,
    "explicacion": "Es de la Unión la obtenida totalmente en la UE <b>sin agregar mercancías importadas</b>.",
    "paso": 2
  },
  {
    "enunciado": "A efectos de obligaciones aduaneras, cuando nos referimos a exportación hablamos de:",
    "opciones": [
      "salida del territorio aduanero de la Unión Europea de mercancías de la Unión.",
      "salida de mercancías desde un Estado de la Unión Europea con destino a otro Estado miembro.",
      "intercambios de mercancías dentro del territorio aduanero de la Unión.",
      "intercambios de autorizaciones bilaterales entre Estados."
    ],
    "correcta": 0,
    "veces": 13,
    "explicacion": "Exportar es sacar mercancía de la Unión <b>fuera del territorio aduanero de la Unión</b>.",
    "paso": 3
  },
  {
    "enunciado": "¿En qué régimen aduanero se incluyen las mercancías de la Unión que van a salir del territorio aduanero de la Unión Europea?",
    "opciones": [
      "En el régimen de importación.",
      "En el régimen de exportación.",
      "En el régimen de expedición extracomunitaria.",
      "En el régimen de despacho a libre práctica."
    ],
    "correcta": 1,
    "veces": 6,
    "explicacion": "Van al <b>régimen de exportación</b>.",
    "paso": 3
  },
  {
    "enunciado": "Las mercancías que se encuentran bajo vigilancia aduanera...",
    "opciones": [
      "no pueden ser descargadas en ningún caso.",
      "solo pueden ser descargadas con autorización de las autoridades aduaneras.",
      "pueden ser descargadas sin autorización en caso de peligro inminente.",
      "pueden ser descargadas cuando el consignatario lo autorice."
    ],
    "correcta": 2,
    "veces": 4,
    "explicacion": "Se pueden descargar sin permiso <b>en caso de peligro inminente</b>.",
    "paso": 3
  },
  {
    "enunciado": "¿En qué situación quedan las mercancías no pertenecientes a la Unión a partir del momento de su presentación en la aduana?",
    "opciones": [
      "Quedan en depósito temporal.",
      "Son despachadas a libre práctica de modo inmediato.",
      "Son incluidas en el régimen de tránsito interno de la Unión.",
      "Son incluidas en el régimen de exportación."
    ],
    "correcta": 0,
    "veces": 4,
    "explicacion": "Al presentarlas en la aduana quedan en <b>depósito temporal</b>.",
    "paso": 3
  },
  {
    "enunciado": "¿Las autoridades aduaneras pueden disponer la destrucción de las mercancías?",
    "opciones": [
      "Sí, corriendo los costes de la destrucción a cargo del titular de las mercancías.",
      "Sí, corriendo los costes de la destrucción a cargo de la Administración aduanera.",
      "Sí, compensando los perjuicios al titular de las mercancías.",
      "No, salvo que obtengan permiso del titular de las mercancías."
    ],
    "correcta": 0,
    "veces": 4,
    "explicacion": "<b>Sí</b>, y el gasto lo paga el dueño de la mercancía.",
    "paso": 3
  },
  {
    "enunciado": "¿En qué régimen aduanero se incluyen las mercancías de la Unión Europea que van a salir del territorio aduanero de la Unión Europea?",
    "opciones": [
      "En el régimen de importación.",
      "En el régimen de exportación.",
      "En el régimen de expedición extracomunitaria.",
      "En el régimen de despacho a libre práctica."
    ],
    "correcta": 1,
    "veces": 4,
    "explicacion": "Van al <b>régimen de exportación</b>.",
    "paso": 3
  },
  {
    "enunciado": "En el ámbito de los procedimientos aduaneros, ¿qué se entiende por levante de las mercancías?",
    "opciones": [
      "Poner las mercancías a disposición de las autoridades aduaneras.",
      "Poner las mercancías a disposición de los fines del régimen aduanero en el que se han incluido.",
      "Descargar las mercancías del vehículo en el que han sido introducidas en el territorio aduanero de la Unión.",
      "Transbordar las mercancías en la frontera de un medio de transporte a otro."
    ],
    "correcta": 1,
    "veces": 3,
    "explicacion": "Levante es <b>liberar la mercancía para el régimen pedido</b>.",
    "paso": 3
  },
  {
    "enunciado": "Las mercancías que se encuentran bajo vigilancia aduanera:",
    "opciones": [
      "no pueden ser descargadas en ningún caso.",
      "solo pueden ser descargadas con autorización de las autoridades aduaneras.",
      "pueden ser descargadas sin autorización en caso de peligro inminente.",
      "pueden ser descargadas cuando el consignatario lo autorice."
    ],
    "correcta": 2,
    "veces": 3,
    "explicacion": "Se pueden descargar sin permiso <b>en caso de peligro inminente</b>.",
    "paso": 3
  },
  {
    "enunciado": "¿En qué régimen aduanero se incluyen las mercancías no pertenecientes a la Unión destinadas a ser introducidas en el mercado de la Unión Europea?",
    "opciones": [
      "En el régimen de importación.",
      "En el régimen de tránsito interno de la Unión.",
      "En el régimen de zona franca.",
      "En el régimen de despacho a libre práctica."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Para venderla en la UE va al <b>despacho a libre práctica</b>.",
    "paso": 3
  },
  {
    "enunciado": "¿Durante cuánto tiempo, como máximo, permanecerán en depósito temporal las mercancías no pertenecientes a la Unión cuando son introducidas en el territorio aduanero de la Unión?",
    "opciones": [
      "48 horas.",
      "15 días.",
      "60 días.",
      "90 días."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Como mucho, <b>90 días</b>.",
    "paso": 3
  },
  {
    "enunciado": "¿Cuándo dejan de estar bajo vigilancia aduanera las mercancías no pertenecientes a la Unión que son introducidas en el territorio aduanero de la Unión Europea?",
    "opciones": [
      "Cuando se determina su estatuto aduanero.",
      "Cuando cambia su estatuto aduanero.",
      "Cuando salen del territorio aduanero de la Unión.",
      "Las respuestas B y C son correctas."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Dejan de estar vigiladas cuando <b>cambia su estatuto o salen del territorio</b>: B y C.",
    "paso": 3
  },
  {
    "enunciado": "¿Qué es el DUA?",
    "opciones": [
      "El documento para formular declaraciones en aduana cuando no se utilicen técnicas de tratamiento electrónico de datos.",
      "Un tipo de autorización de transporte internacional de mercancías expedido por la Unión Europea.",
      "Un tipo de autorización de transporte internacional de mercancías que sirve en el ámbito de los países miembros de la CEMT.",
      "Un cuaderno que debe acompañar a la autorización de transporte CEMT."
    ],
    "correcta": 0,
    "veces": 23,
    "explicacion": "El DUA es el documento para las declaraciones <b>cuando no se hacen por computadora</b>.",
    "paso": 4
  },
  {
    "enunciado": "Para comprobar la exactitud de una declaración en aduana, las autoridades aduaneras podrán:",
    "opciones": [
      "exigir otros documentos al declarante.",
      "examinar las mercancías.",
      "exigir información al consignatario del envío.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 3,
    "veces": 14,
    "explicacion": "La aduana puede <b>pedir más documentos y examinar la mercancía</b>: A y B.",
    "paso": 4
  },
  {
    "enunciado": "¿Qué documento sirve para formular declaraciones en aduana cuando no se utilicen técnicas de tratamiento electrónico de datos?",
    "opciones": [
      "El documento único de intercambio (DUI).",
      "El documento de importación y exportación universal (UDEI).",
      "El documento internacional de movimiento de mercancías (MMID).",
      "El documento administrativo único (DUA)."
    ],
    "correcta": 3,
    "veces": 7,
    "explicacion": "Se llama <b>Documento Administrativo Único (DUA)</b>.",
    "paso": 4
  },
  {
    "enunciado": "En el caso de mercancías de la Unión, ¿en qué supuestos hay que formular declaración aduanera?",
    "opciones": [
      "En las exportaciones.",
      "Para amparar la circulación por el territorio aduanero de la Unión de mercancías despachadas para exportación que viajen a otro Estado miembro para su salida efectiva.",
      "En los intercambios entre un punto del territorio aduanero en el que se aplica el IVA y otro en el que no se aplica.",
      "Todas las respuestas son correctas."
    ],
    "correcta": 3,
    "veces": 6,
    "explicacion": "Para mercancías de la Unión hay declaración en los tres casos: <b>todas</b>.",
    "paso": 4
  },
  {
    "enunciado": "¿Se exige estar establecido en el territorio aduanero de la Unión Europea para poder presentar una declaración en aduana?",
    "opciones": [
      "En ningún caso.",
      "Siempre.",
      "Se exige, salvo excepciones.",
      "No se exige, salvo excepciones."
    ],
    "correcta": 2,
    "veces": 4,
    "explicacion": "Hay que estar establecido en la UE, <b>salvo excepciones</b>.",
    "paso": 4
  },
  {
    "enunciado": "¿Cómo debe efectuarse el intercambio de información entre las autoridades aduaneras y los operadores económicos?",
    "opciones": [
      "Siempre mediante técnicas de tratamiento electrónico de datos.",
      "Mediante técnicas de tratamiento electrónico de datos, salvo que por el tipo de tráfico resulte justificado otro procedimiento.",
      "Mediante técnicas de tratamiento electrónico de datos, salvo que fallen los sistemas informáticos.",
      "Las respuestas B y C son correctas."
    ],
    "correcta": 3,
    "veces": 4,
    "explicacion": "Por computadora, con las excepciones que fija la norma: <b>B y C</b>.",
    "paso": 4
  },
  {
    "enunciado": "¿Qué modalidades de presentación admite el DUA?",
    "opciones": [
      "En papel.",
      "Mediante transmisión electrónica de datos.",
      "Depende de cada aduana.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 3,
    "veces": 3,
    "explicacion": "Se presenta <b>en papel o por transmisión electrónica</b>: A y B.",
    "paso": 4
  },
  {
    "enunciado": "¿Cómo se denomina la declaración que hay que presentar cuando se introducen mercancías en el territorio aduanero de la Unión Europea?",
    "opciones": [
      "Declaración sumaria de entrada.",
      "Declaración de importación.",
      "Declaración de introducción.",
      "Declaración de levante de mercancías."
    ],
    "correcta": 0,
    "veces": 3,
    "explicacion": "Al entrar se presenta la <b>declaración sumaria de entrada</b>.",
    "paso": 4
  },
  {
    "enunciado": "En el caso de mercancías de la Unión, ¿en qué supuestos se cumplimenta el DUA?",
    "opciones": [
      "Cuando van a ser exportadas.",
      "Cuando van a ser incluidas en cualquier otro régimen aduanero.",
      "En ningún caso.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 0,
    "veces": 2,
    "explicacion": "Para mercancías de la Unión, el DUA se hace <b>al exportarlas</b>.",
    "paso": 4
  },
  {
    "enunciado": "¿Cuánto tiempo se debe conservar la documentación relativa a procedimientos aduaneros con el fin de posibilitar los controles aduaneros?",
    "opciones": [
      "Un año.",
      "Tres años.",
      "Cinco años.",
      "Hasta que se venda o destruya la mercancía en cuestión."
    ],
    "correcta": 1,
    "veces": 2,
    "explicacion": "Los papeles de la aduana se guardan <b>3 años</b>.",
    "paso": 4
  },
  {
    "enunciado": "¿En relación con qué tipo de mercancías hay que formular declaraciones aduaneras?",
    "opciones": [
      "Mercancías de la Unión.",
      "Mercancías no pertenecientes a la Unión.",
      "En la actualidad ya no es necesario ni con una ni con otra porque la Unión Europea constituye un territorio aduanero único.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 3,
    "veces": 2,
    "explicacion": "Hay declaración para mercancías <b>de la Unión y de afuera</b>: A y B.",
    "paso": 4
  },
  {
    "enunciado": "¿Qué tipos de declaración en aduana se utilizan para incluir una mercancía en un régimen aduanero?",
    "opciones": [
      "Normal y simplificada.",
      "Ordinaria y extraordinaria.",
      "Común y específica.",
      "General y particular."
    ],
    "correcta": 0,
    "veces": 2,
    "explicacion": "Las declaraciones son <b>normal y simplificada</b>.",
    "paso": 4
  },
  {
    "enunciado": "¿Cuándo hay que presentar la declaración sumaria de entrada en el territorio aduanero de la Unión Europea, en el caso de mercancías transportadas por carretera?",
    "opciones": [
      "A más tardar, una hora antes de que las mercancías sean introducidas.",
      "A más tardar, un día antes de que las mercancías sean introducidas.",
      "A más tardar, una hora después de que las mercancías sean introducidas.",
      "A más tardar, un día después de que las mercancías sean introducidas."
    ],
    "correcta": 0,
    "veces": 2,
    "explicacion": "Por carretera, como mínimo <b>1 hora antes</b> de entrar.",
    "paso": 4
  },
  {
    "enunciado": "¿Qué es el DUA?",
    "opciones": [
      "El modelo oficial para formular declaraciones aduaneras de mercancías.",
      "Un tipo de autorización de transporte internacional de mercancías expedido por la Unión Europea.",
      "Un tipo de autorización de transporte internacional de mercancías sirve en el ámbito de los países miembros de la CEMT.",
      "Un cuaderno que debe acompañar a la autorización de transporte CEMT."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "El DUA es el <b>modelo oficial</b> para las declaraciones de mercancías.",
    "paso": 4
  },
  {
    "enunciado": "¿Cuándo hay que presentar la declaración sumaria de entrada de mercancías en el territorio aduanero de la Unión Europea?",
    "opciones": [
      "Antes de que las mercancías sean introducidas.",
      "En el mismo momento en el que las mercancías son introducidas.",
      "Hasta 24 horas después de que las mercancías hayan sido introducidas.",
      "Hasta 48 horas después de que las mercancías hayan sido introducidas."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "Se presenta <b>antes</b> de que la mercancía entre.",
    "paso": 4
  },
  {
    "enunciado": "¿Quién está obligado a presentar la declaración sumaria de entrada de mercancías en el territorio aduanero de la Unión Europea?",
    "opciones": [
      "El transportista.",
      "El importador.",
      "El consignatario.",
      "Ninguno de los anteriores."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "La presenta <b>el transportista</b>.",
    "paso": 4
  },
  {
    "enunciado": "¿Qué potestades tienen las autoridades aduaneras respecto de las mercancías que salen del territorio aduanero de la Unión Europea?",
    "opciones": [
      "Pueden determinar la ruta que debe utilizarse.",
      "Pueden determinar el plazo de salida.",
      "Pueden determinar la ruta y el plazo, pero solo si concurren circunstancias excepcionales.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Puede fijar la <b>ruta y el plazo</b> de salida: A y B.",
    "paso": 4
  },
  {
    "enunciado": "En el caso de mercancías no pertenecientes a la Unión, ¿en qué supuestos hay que formular declaración aduanera?",
    "opciones": [
      "Cuando se importan para su consumo.",
      "Cuando van a ser incluidas en cualquier otro régimen aduanero.",
      "Cuando van a ser reexportadas fuera del territorio aduanero de la Unión.",
      "Todas las respuestas anteriores son correctas."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Para mercancías de afuera hay declaración en los tres casos: <b>todas</b>.",
    "paso": 4
  },
  {
    "enunciado": "La declaración previa a la salida de mercancías del territorio aduanero de la Unión se hace mediante una:",
    "opciones": [
      "declaración en aduana.",
      "declaración de reexportación.",
      "declaración sumaria de salida.",
      "Todas las respuestas son correctas."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Puede ser declaración en aduana, de reexportación o sumaria de salida: <b>todas</b>.",
    "paso": 4
  },
  {
    "enunciado": "¿Quién está obligado a presentar la declaración sumaria de salida de mercancías del territorio aduanero de la Unión Europea?",
    "opciones": [
      "El transportista.",
      "El importador.",
      "El consignatario.",
      "Ninguno de los anteriores."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "La presenta <b>el transportista</b>.",
    "paso": 4
  },
  {
    "enunciado": "En el ámbito de los procedimientos aduaneros, a la aduana competente respecto del punto de salida o entrada de las mercancías en el territorio aduanero de la Unión, cuando abandonan o entran en dicho territorio en el transcurso de una operación de tránsito, se la denomina:",
    "opciones": [
      "aduana de partida.",
      "aduana de tránsito.",
      "aduana de destino.",
      "aduana de primera entrada."
    ],
    "correcta": 1,
    "veces": 13,
    "explicacion": "La del punto de entrada o salida del territorio de la Unión es la <b>aduana de tránsito</b>.",
    "paso": 5
  },
  {
    "enunciado": "¿En qué consiste el tránsito aduanero?",
    "opciones": [
      "En colocar las mercancías bajo control aduanero para su transporte entre dos aduanas.",
      "En atravesar una aduana transportando mercancías.",
      "En atravesar una aduana transportando personas o mercancías.",
      "En encomendar a la Administración de aduanas el traslado de las mercancías."
    ],
    "correcta": 0,
    "veces": 7,
    "explicacion": "Es llevar mercancías <b>de una aduana a otra bajo control aduanero</b>.",
    "paso": 5
  },
  {
    "enunciado": "En el caso de transportes efectuados en régimen de tránsito de la Unión, ¿qué se considera aduana de partida?",
    "opciones": [
      "La aduana más próxima al lugar en el que se cargan las mercancías.",
      "La aduana en la que se admite la declaración por la que las mercancías se incluyen en un régimen de tránsito.",
      "La aduana de salida del territorio aduanero comunitario.",
      "La aduana de entrada en el territorio aduanero comunitario."
    ],
    "correcta": 1,
    "veces": 7,
    "explicacion": "La de partida es <b>donde se acepta la declaración</b> y empieza el tránsito.",
    "paso": 5
  },
  {
    "enunciado": "En el caso de transportes efectuados en régimen de tránsito de la Unión, ¿qué se considera aduana de destino?",
    "opciones": [
      "La aduana más próxima al lugar de llegada de las mercancías.",
      "La aduana de salida del territorio aduanero comunitario.",
      "La aduana en la que se presentan las mercancías para poner fin al régimen de tránsito.",
      "Ninguna de las respuestas anteriores es correcta."
    ],
    "correcta": 2,
    "veces": 7,
    "explicacion": "La de destino es <b>donde se presenta la mercancía para terminar</b> el tránsito.",
    "paso": 5
  },
  {
    "enunciado": "¿Cuál de los siguientes es un sistema de tránsito aduanero utilizado en la Unión Europea?",
    "opciones": [
      "El régimen de tránsito interno.",
      "El Manifiesto Renano.",
      "El régimen de envíos postales.",
      "Todas las respuestas son correctas."
    ],
    "correcta": 3,
    "veces": 6,
    "explicacion": "Todos esos son sistemas de tránsito: <b>todas</b>.",
    "paso": 5
  },
  {
    "enunciado": "¿En qué consiste el tránsito aduanero?",
    "opciones": [
      "En la libre circulación de mercancías de una aduana a otra.",
      "En la libre circulación de vehículos de una aduana a otra.",
      "Es un tipo autorización para pasar por la aduana sin control previo.",
      "En trasladar mercancías de una aduana a otra bajo control aduanero."
    ],
    "correcta": 3,
    "veces": 6,
    "explicacion": "Es llevar mercancías <b>de una aduana a otra bajo control aduanero</b>.",
    "paso": 5
  },
  {
    "enunciado": "¿Cuál de los siguientes es un sistema de tránsito aduanero utilizado en la Unión Europea?",
    "opciones": [
      "El Convenio TIR.",
      "El Convenio ATA.",
      "El régimen de tránsito externo.",
      "Todas las respuestas anteriores son correctas."
    ],
    "correcta": 3,
    "veces": 5,
    "explicacion": "Todos esos son sistemas de tránsito: <b>todas</b>.",
    "paso": 5
  },
  {
    "enunciado": "¿En qué consiste el tránsito aduanero?",
    "opciones": [
      "En la libre circulación de mercancías.",
      "En la libre circulación de vehículos.",
      "En una autorización para no pasar por la aduana.",
      "En trasladar mercancías de una aduana a otra bajo control aduanero."
    ],
    "correcta": 3,
    "veces": 5,
    "explicacion": "Es llevar mercancías <b>de una aduana a otra bajo control aduanero</b>.",
    "paso": 5
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión, ¿qué se debe presentar en las aduanas de tránsito?",
    "opciones": [
      "El número de registro asignado a la declaración de tránsito por las autoridades aduaneras (MRN).",
      "La declaración de tránsito.",
      "El justificante de garantía.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 0,
    "veces": 4,
    "explicacion": "En las aduanas de paso se presenta el <b>MRN</b>, el número de la declaración.",
    "paso": 5
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito comunitario, ¿qué se debe presentar en las aduanas de paso?",
    "opciones": [
      "El MRN de la declaración de tránsito.",
      "El seguro de la mercancía.",
      "La licencia comunitaria o, en su caso, la autorización de transporte internacional que cubre el transporte.",
      "Las respuestas A y C son correctas."
    ],
    "correcta": 0,
    "veces": 2,
    "explicacion": "En las aduanas de paso se presenta el <b>MRN</b>, el número de la declaración.",
    "paso": 5
  },
  {
    "enunciado": "En el ámbito de los procedimientos aduaneros, a la aduana competente respecto del punto de salida o entrada de las mercancías en el territorio aduanero de la Unión cuando abandonan o entran en dicho territorio en el transcurso de una operación de tránsito se la denomina:",
    "opciones": [
      "Aduana de partida.",
      "Aduana de tránsito.",
      "Aduana de destino.",
      "Aduana de primera entrada."
    ],
    "correcta": 1,
    "veces": 2,
    "explicacion": "La del punto de entrada o salida del territorio de la Unión es la <b>aduana de tránsito</b>.",
    "paso": 5
  },
  {
    "enunciado": "En el caso de transportes efectuados en régimen de tránsito de la Unión, ¿cómo se denomina el documento expedido para acompañar a las mercancías?",
    "opciones": [
      "Guía aduanera de tránsito.",
      "Documento de acompañamiento de mercancías.",
      "Documento de acompañamiento de tránsito.",
      "Tal documento no se expide nunca desde que se utilizan procedimientos telemáticos."
    ],
    "correcta": 2,
    "veces": 1,
    "explicacion": "Se llama <b>documento de acompañamiento de tránsito</b>.",
    "paso": 5
  },
  {
    "enunciado": "Los sistemas de tránsito aduanero consisten en trasladar mercancías:",
    "opciones": [
      "de una aduana a otra bajo control aduanero.",
      "de una aduana a otra sin control aduanero.",
      "a una aduana para que allí sean recogidas por un transportista local.",
      "de la aduana para realizar su transporte por territorio nacional."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "Es llevar mercancías <b>de una aduana a otra bajo control aduanero</b>.",
    "paso": 5
  },
  {
    "enunciado": "Para el transporte de mercancías entre los países de la Unión Europea y los pertenecientes a la Asociación Europea de Libre Comercio, ¿cuál es el sistema de tránsito aduanero utilizado?",
    "opciones": [
      "El tránsito de la Unión.",
      "La convención TIR.",
      "El tránsito común.",
      "La convención ATA."
    ],
    "correcta": 2,
    "veces": 1,
    "explicacion": "Entre la UE y Suiza, Noruega, Islandia y Liechtenstein se usa el <b>tránsito común</b>.",
    "paso": 5
  },
  {
    "enunciado": "¿A qué se denomina tránsito de la Unión en el ámbito de la normativa aduanera?",
    "opciones": [
      "A un régimen de tránsito aduanero utilizado para el transporte de mercancías entre dos puntos exteriores al territorio de la Unión Europea que atraviesa en su recorrido al menos dos países de la Unión.",
      "A un régimen de tránsito aduanero utilizado para el transporte de mercancías entre dos puntos del territorio de la Unión Europea.",
      "A un régimen de tránsito aduanero utilizado para el transporte de mercancías entre un punto del territorio de la Unión Europea y un país del Este de Europa no perteneciente a la Unión.",
      "Todas las respuestas son correctas."
    ],
    "correcta": 1,
    "veces": 1,
    "explicacion": "El tránsito de la Unión es para llevar mercancía <b>entre dos puntos de la UE</b>.",
    "paso": 5
  },
  {
    "enunciado": "El transportista que acepte mercancías incluidas en el régimen de tránsito de la Unión, ¿es responsable de presentarlas en la aduana de destino?",
    "opciones": [
      "Sí.",
      "Sí, pero solo cuando las mercancías presenten riesgo elevado de fraude.",
      "No, esta responsabilidad solo incumbe al expedidor de las mercancías.",
      "No, esta responsabilidad solo incumbe al destinatario de las mercancías."
    ],
    "correcta": 0,
    "veces": 19,
    "explicacion": "<b>Sí</b>: el transportista que las acepta también responde.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de transportes efectuados en régimen de tránsito de la Unión, ¿qué significa que la garantía de pago de los derechos aduaneros puede ser de carácter global?",
    "opciones": [
      "Que puede cubrir varias operaciones de transporte.",
      "Que puede cubrir a varios operadores.",
      "Que puede cubrir a todos los operadores que sean miembros de una misma asociación de transportistas.",
      "Que puede cubrir a todos los operadores de un mismo país."
    ],
    "correcta": 0,
    "veces": 12,
    "explicacion": "Global quiere decir que <b>cubre varios viajes</b>.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de transportes efectuados en régimen de tránsito de la Unión, en los que el pago de los derechos aduaneros se afiance mediante una garantía global, las autoridades aduaneras:",
    "opciones": [
      "pueden conceder, en determinados supuestos, reducciones en el importe de la garantía.",
      "pueden conceder, en determinados supuestos, exenciones de la garantía.",
      "no pueden conceder reducciones ni exenciones porque el importe es fijo y viene determinado por la normativa aduanera.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 3,
    "veces": 9,
    "explicacion": "Puede tener <b>reducciones y exenciones</b>: A y B.",
    "paso": 6
  },
  {
    "enunciado": "La garantía exigida en el caso de transportes efectuados en régimen de tránsito de la Unión será:",
    "opciones": [
      "individual para cada transporte.",
      "global para varios transportes, previa autorización de las autoridades aduaneras.",
      "global para varios transportes, sin necesidad de autorización previa.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 3,
    "veces": 8,
    "explicacion": "Puede ser <b>individual</b> o <b>global con permiso</b>: A y B.",
    "paso": 6
  },
  {
    "enunciado": "¿A quién incumbe la obligación de presentar en la aduana de destino las mercancías incluidas en una operación de tránsito de la Unión?",
    "opciones": [
      "Al titular del régimen de tránsito.",
      "Al transportista que las acepte sabiendo que están incluidas en una operación de tránsito.",
      "Al destinatario que las acepte sabiendo que están incluidas en una operación de tránsito.",
      "Todas las respuestas son correctas."
    ],
    "correcta": 3,
    "veces": 8,
    "explicacion": "El titular, el transportista y el destinatario que las aceptan: <b>todas</b>.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión, ¿en qué plazo deben presentarse las mercancías en la aduana de destino?",
    "opciones": [
      "En el plazo máximo de cuatro días.",
      "En el plazo máximo de una semana.",
      "En el plazo máximo de diez días.",
      "En el plazo que fije la aduana de partida."
    ],
    "correcta": 3,
    "veces": 7,
    "explicacion": "En el plazo que fije <b>la aduana de partida</b>.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión, ¿en qué plazo deben presentarse las mercancías en la aduana de destino?",
    "opciones": [
      "En el plazo que fije la aduana de partida.",
      "En el plazo que fije la aduana de destino.",
      "No hay plazo máximo, pueden presentarse cuando lo decida el operador.",
      "En el plazo máximo de diez días."
    ],
    "correcta": 0,
    "veces": 5,
    "explicacion": "En el plazo que fije <b>la aduana de partida</b>.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión, ¿cómo se puede prestar la garantía individual que se exige?",
    "opciones": [
      "Mediante depósito en metálico.",
      "Mediante compromiso suscrito por un fiador.",
      "Mediante prenda constituida sobre las mercancías.",
      "Las respuestas A y B son correctas."
    ],
    "correcta": 3,
    "veces": 5,
    "explicacion": "En <b>dinero</b> o con un <b>fiador</b>: A y B.",
    "paso": 6
  },
  {
    "enunciado": "Para poder utilizar el régimen de tránsito externo de la Unión en el transporte de mercancías, el operador deberá...",
    "opciones": [
      "pagar previamente el importe total de la deuda aduanera.",
      "pagar previamente el 50 % de la deuda aduanera.",
      "pagar previamente el 25 % de la deuda aduanera.",
      "constituir una garantía que asegure el pago de la deuda aduanera."
    ],
    "correcta": 3,
    "veces": 4,
    "explicacion": "Hay que dejar una <b>garantía</b> que asegure el pago.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión, ¿qué notificaciones debe emitir la aduana de destino?",
    "opciones": [
      "Una notificación de llegada para la aduana de partida.",
      "Notificaciones de llegada para la aduana de partida y para las aduanas de tránsito.",
      "Una notificación de los resultados del control para la aduana de partida.",
      "Las respuestas A y C son correctas."
    ],
    "correcta": 3,
    "veces": 4,
    "explicacion": "Avisa la llegada y el resultado del control a la aduana de partida: <b>A y C</b>.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión Europea, ¿en qué plazo deben presentarse las mercancías en la aduana de destino?",
    "opciones": [
      "En el plazo máximo de cuatro días.",
      "En el plazo máximo de una semana.",
      "En el plazo máximo de diez días.",
      "En el plazo que fije la aduana de partida."
    ],
    "correcta": 3,
    "veces": 4,
    "explicacion": "En el plazo que fije <b>la aduana de partida</b>.",
    "paso": 6
  },
  {
    "enunciado": "El transportista que acepte mercancías incluidas en el régimen de tránsito de la Unión, ¿es responsable de presentarlas en la aduana de destino?",
    "opciones": [
      "Sí.",
      "Sí, pero sólo cuando las mercancías presenten riesgo elevado de fraude.",
      "No, esta responsabilidad sólo incumbe al expedidor de las mercancías.",
      "No, esta responsabilidad sólo incumbe al destinatario de las mercancías."
    ],
    "correcta": 0,
    "veces": 3,
    "explicacion": "<b>Sí</b>: el transportista que las acepta también responde.",
    "paso": 6
  },
  {
    "enunciado": "Para poder utilizar el régimen de tránsito externo de la Unión en el transporte de mercancías el operador deberá:",
    "opciones": [
      "pagar previamente el importe total de la deuda aduanera.",
      "pagar previamente el 50% de la deuda aduanera.",
      "pagar previamente el 25% de la deuda aduanera.",
      "constituir una garantía que asegure el pago de la deuda aduanera."
    ],
    "correcta": 3,
    "veces": 3,
    "explicacion": "Hay que dejar una <b>garantía</b> que asegure el pago.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de transportes efectuados en régimen de tránsito de la Unión, ¿cuándo se permite responder de las obligaciones aduaneras mediante garantía global?",
    "opciones": [
      "Siempre que lo desee el operador, sin necesidad de solicitar ninguna autorización.",
      "Previa autorización de la Administración aduanera, que se concede a todos los operadores que lo soliciten, si están establecidos en la Unión Europea.",
      "Previa autorización de la Administración aduanera, cuya concesión exige que el operador no haya cometido infracciones graves o reiteradas contra la legislación aduanera o fiscal.",
      "No se permite en ningún supuesto, la garantía tiene que ser siempre individual."
    ],
    "correcta": 2,
    "veces": 3,
    "explicacion": "Con <b>permiso de la aduana</b>, a quien no tiene infracciones graves o repetidas.",
    "paso": 6
  },
  {
    "enunciado": "En caso de producirse alguna incidencia durante un transporte efectuado en régimen de tránsito de la Unión, ¿qué debe hacer el transportista por lo que se refiere a la normativa aduanera?",
    "opciones": [
      "Comunicarlo al expedidor de la mercancía.",
      "Comunicarlo al consignatario de la mercancía.",
      "Comunicarlo a la aduana de partida.",
      "Presentar las mercancías ante la autoridad aduanera más próxima del Estado en el que se encuentre."
    ],
    "correcta": 3,
    "veces": 2,
    "explicacion": "Presentar la mercancía en la <b>aduana más cercana</b> del país donde estés.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito comunitario, ¿cómo se determina el itinerario del viaje?",
    "opciones": [
      "Lo elige siempre cada operador, previa consulta con la aduana de partida.",
      "Lo elige siempre cada operador, previa consulta con la aduana de destino.",
      "Lo fija la aduana de destino cuando lo considera necesario.",
      "Lo fija la aduana de partida cuando lo considera necesario."
    ],
    "correcta": 3,
    "veces": 2,
    "explicacion": "Lo fija la <b>aduana de partida</b> cuando lo considera necesario.",
    "paso": 6
  },
  {
    "enunciado": "Un transporte realizado en régimen de tránsito de la Unión, ¿se debe efectuar siguiendo un itinerario obligatorio?",
    "opciones": [
      "Sí, siempre.",
      "No, el itinerario lo elige siempre el operador.",
      "Sí, cuando lo fije la aduana de partida por considerarlo necesario.",
      "Sí, cuando lo fije la aduana de destino por considerarlo necesario."
    ],
    "correcta": 2,
    "veces": 2,
    "explicacion": "Lo fija la <b>aduana de partida</b> cuando lo considera necesario.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión, ¿cómo se determina el itinerario del viaje?",
    "opciones": [
      "Es completamente libre, lo elige cada operador a su voluntad.",
      "Salvo que lo fijen las autoridades aduaneras, es de elección libre para el operador, pero se debe utilizar un trayecto que esté justificado desde el punto de vista económico.",
      "Lo fija siempre la aduana de partida.",
      "Lo fija siempre la aduana de destino."
    ],
    "correcta": 1,
    "veces": 2,
    "explicacion": "Es libre salvo que lo fije la aduana, pero el camino tiene que estar justificado.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión, ¿qué factores deben tener en cuenta las autoridades aduaneras para fijar el plazo de presentación de las mercancías en la aduana de destino?",
    "opciones": [
      "El itinerario.",
      "El medio de transporte.",
      "La legislación en materia de transportes.",
      "Todas las respuestas son correctas."
    ],
    "correcta": 3,
    "veces": 2,
    "explicacion": "Itinerario, medio de transporte y legislación: <b>todas</b>.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión, ¿cómo se determina el itinerario del viaje?",
    "opciones": [
      "Es completamente libre; lo elige cada operador a su voluntad.",
      "Salvo que lo fijen las autoridades aduaneras, es de elección libre para el operador, pero se debe utilizar un trayecto que esté justificado desde el punto de vista económico.",
      "Lo fija siempre la aduana de partida.",
      "Lo fija siempre la aduana de destino."
    ],
    "correcta": 1,
    "veces": 1,
    "explicacion": "Es libre salvo que lo fije la aduana, pero el camino tiene que estar justificado.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión en el que la garantía es individual y se presta mediante títulos emitidos por un fiador autorizado, ¿qué valor tienen dichos títulos?",
    "opciones": [
      "5.000 euros.",
      "7.000 euros.",
      "10.000 euros.",
      "El que corresponda en cada caso, según el importe de la deuda aduanera que se garantiza."
    ],
    "correcta": 2,
    "veces": 1,
    "explicacion": "Cada título vale <b>10.000 €</b>.",
    "paso": 6
  },
  {
    "enunciado": "En el caso de un transporte efectuado en régimen de tránsito de la Unión cuyas obligaciones aduaneras son afianzadas mediante garantía individual, la garantía cubrirá:",
    "opciones": [
      "el importe íntegro de la deuda aduanera que pueda originarse.",
      "el 75% de la deuda aduanera que pueda originarse.",
      "el 50% de la deuda aduanera que pueda originarse.",
      "el 25% de la deuda aduanera que pueda originarse."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "Cubre <b>todo</b> lo que se podría deber.",
    "paso": 6
  },
  {
    "enunciado": "La condición de operador económico autorizado es reconocida por:",
    "opciones": [
      "el Ministerio de Fomento.",
      "las Comunidades Autónomas.",
      "las autoridades aduaneras.",
      "la Comisión de la Unión Europea."
    ],
    "correcta": 2,
    "veces": 16,
    "explicacion": "Lo reconocen las <b>autoridades aduaneras</b>.",
    "paso": 7
  },
  {
    "enunciado": "¿Quiénes son los profesionales especializados en organizar transportes internacionales y llevar a cabo los trámites aduaneros?",
    "opciones": [
      "Los agentes de aduanas.",
      "Los transitarios.",
      "Los agentes de inspección.",
      "Los gestores internacionales."
    ],
    "correcta": 1,
    "veces": 11,
    "explicacion": "Son los <b>transitarios</b>.",
    "paso": 7
  },
  {
    "enunciado": "¿Se pueden acumular en una misma persona las diferentes modalidades del estatuto de operador económico autorizado?",
    "opciones": [
      "Sí.",
      "No.",
      "Es una decisión que depende de cada Estado.",
      "Depende del volumen de operaciones que se realicen anualmente."
    ],
    "correcta": 0,
    "veces": 8,
    "explicacion": "<b>Sí</b>, se pueden tener varias modalidades a la vez.",
    "paso": 7
  },
  {
    "enunciado": "¿Quiénes son los profesionales especializados en organizar transportes internacionales y llevar a cabo los trámites aduaneros?",
    "opciones": [
      "Los aduaneros.",
      "Los transitarios.",
      "Los agentes de inspección.",
      "Los transportistas."
    ],
    "correcta": 1,
    "veces": 7,
    "explicacion": "Son los <b>transitarios</b>.",
    "paso": 7
  },
  {
    "enunciado": "En el marco de la normativa aduanera, ¿qué es un operador económico autorizado?",
    "opciones": [
      "Una empresa autorizada para fabricar un determinado producto.",
      "Una empresa autorizada para exportar e importar cualquier mercancía.",
      "Una empresa autorizada para comerciar en toda la Unión Europea.",
      "Una empresa a la que se ha concedido un estatuto especial en lo que se refiere a controles aduaneros."
    ],
    "correcta": 3,
    "veces": 6,
    "explicacion": "Es una empresa con un <b>estatuto especial en los controles aduaneros</b>.",
    "paso": 7
  },
  {
    "enunciado": "La condición de operador económico autorizado es reconocida por:",
    "opciones": [
      "el Ministerio de Transportes.",
      "las Comunidades Autónomas.",
      "las autoridades aduaneras de los Estados de la UE.",
      "la Comisión de la Unión Europea."
    ],
    "correcta": 2,
    "veces": 4,
    "explicacion": "Lo reconocen las <b>autoridades aduaneras</b>.",
    "paso": 7
  },
  {
    "enunciado": "Se considera delito de contrabando la importación y exportación de mercancías de lícito comercio, incumpliendo las obligaciones aduaneras, siempre que su valor sea igual o superior a:",
    "opciones": [
      "18.000 euros.",
      "50.000 euros.",
      "100.000 euros.",
      "150.000 euros."
    ],
    "correcta": 3,
    "veces": 4,
    "explicacion": "Con mercancía legal es delito desde <b>150.000 €</b>.",
    "paso": 7
  },
  {
    "enunciado": "¿De qué ventajas pueden beneficiarse quienes tienen la condición de operador económico autorizado?",
    "opciones": [
      "De una reducción especial en los gravámenes de importación.",
      "De preferencia en la obtención de subvenciones vinculadas a la exportación.",
      "De facilidades en la realización de los controles aduaneros.",
      "Todas las respuestas anteriores son correctas."
    ],
    "correcta": 2,
    "veces": 3,
    "explicacion": "Tiene <b>facilidades en los controles aduaneros</b>.",
    "paso": 7
  },
  {
    "enunciado": "Si se incumplen las obligaciones aduaneras con una mercancía valorada en 12.000 euros, ¿se incurre en delito de contrabando?",
    "opciones": [
      "No.",
      "Sí, cuando se trata de tabaco.",
      "Sí, cuando se trata de drogas tóxicas.",
      "Las respuestas B y C son correctas."
    ],
    "correcta": 2,
    "veces": 3,
    "explicacion": "Con <b>drogas</b> es delito aunque valga poco.",
    "paso": 7
  },
  {
    "enunciado": "Para obtener el estatuto de operador económico autorizado se requiere:",
    "opciones": [
      "delegaciones comerciales en, al menos, cinco Estados de la Unión Europea.",
      "inexistencia de infracciones graves o reiteradas de la legislación aduanera.",
      "un volumen de negocios superior a 10.000.000 de euros.",
      "Todas las respuestas anteriores son correctas."
    ],
    "correcta": 1,
    "veces": 3,
    "explicacion": "Hace falta <b>no tener infracciones graves o repetidas</b> de aduana.",
    "paso": 7
  },
  {
    "enunciado": "Para obtener el estatuto de operador económico autorizado se requiere:",
    "opciones": [
      "inexistencia de infracciones graves o reiteradas de la legislación aduanera.",
      "un sistema de gestión de los registros comerciales y, en su caso, de transportes que permita la correcta realización de los controles aduaneros.",
      "solvencia financiera acreditada.",
      "Todas las respuestas anteriores son correctas."
    ],
    "correcta": 3,
    "veces": 3,
    "explicacion": "Sin infracciones graves, registros en orden y solvencia: <b>todas</b>.",
    "paso": 7
  },
  {
    "enunciado": "Se considera delito de contrabando la importación y exportación de mercancías de lícito comercio, incumpliendo las obligaciones aduaneras, siempre que su valor sea igual o superior a ...",
    "opciones": [
      "18.000 euros.",
      "50.000 euros.",
      "100.000 euros.",
      "150.000 euros."
    ],
    "correcta": 3,
    "veces": 2,
    "explicacion": "Con mercancía legal es delito desde <b>150.000 €</b>.",
    "paso": 7
  },
  {
    "enunciado": "Si se incumplen las obligaciones aduaneras con una mercancía de lícito comercio valorada en 5.000 euros, ¿se incurre en delito de contrabando?",
    "opciones": [
      "No.",
      "Sí.",
      "Solo dentro del espacio Schengen.",
      "Solo si la mercancía son productos alimenticios."
    ],
    "correcta": 0,
    "veces": 2,
    "explicacion": "<b>No</b>: mercancía legal de 5.000 € no llega a delito.",
    "paso": 7
  },
  {
    "enunciado": "Las mercancías que viajan en régimen TIR deben ir acompañadas de:",
    "opciones": [
      "una declaración responsable de cumplimiento de la normativa aduanera.",
      "un certificado sanitario en el caso de mercancías perecederas.",
      "un cuaderno que sirve como documento de control a las diferentes aduanas.",
      "una liquidación previa de aranceles."
    ],
    "correcta": 2,
    "veces": 15,
    "explicacion": "Van con un <b>cuaderno</b> que sirve de control en las aduanas.",
    "paso": 8
  },
  {
    "enunciado": "¿Quién es responsable de la colocación de los precintos en un transporte TIR?",
    "opciones": [
      "La aduana de salida.",
      "Cada una de las aduanas de tránsito.",
      "La asociación garante.",
      "El transportista."
    ],
    "correcta": 0,
    "veces": 11,
    "explicacion": "Los precintos los pone la <b>aduana de salida</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿Qué es el cuaderno TIR?",
    "opciones": [
      "Es el documento que acompaña a las mercancías en los transportes efectuados en régimen TIR.",
      "El conjunto de normas del régimen TIR.",
      "El documento que autoriza a los vehículos que hacen este tipo de transportes.",
      "El documento que acredita al conductor como profesional especializado."
    ],
    "correcta": 0,
    "veces": 8,
    "explicacion": "Es el documento que <b>acompaña a la mercancía</b> en los transportes TIR.",
    "paso": 8
  },
  {
    "enunciado": "¿Cómo es la placa que deben llevar los vehículos cuando efectúan un transporte en régimen TIR?",
    "opciones": [
      "De fondo blanco con las letras TIR.",
      "De fondo azul con las letras TIR.",
      "De fondo blanco sin letras.",
      "De fondo azul sin letras."
    ],
    "correcta": 1,
    "veces": 7,
    "explicacion": "Placa de <b>fondo azul con las letras TIR</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿Qué requisito debe reunir un vehículo para ser admitido en un transporte TIR?",
    "opciones": [
      "Que se pueda precintar y revisar con facilidad.",
      "Que no posea ningún espacio disimulado para ocultar mercancías.",
      "Que no permita sacar mercancías de la parte precintada sin romper el precinto.",
      "Todas las respuestas anteriores son correctas."
    ],
    "correcta": 3,
    "veces": 7,
    "explicacion": "Precintable, sin escondites y sin poder sacar carga sin romper el precinto: <b>todas</b>.",
    "paso": 8
  },
  {
    "enunciado": "En un transporte efectuado en régimen TIR las mercancías viajan, por regla general,:",
    "opciones": [
      "bajo precinto aduanero.",
      "acompañadas de un agente de aduanas.",
      "con escolta policial.",
      "Ninguna de las respuestas anteriores es correcta."
    ],
    "correcta": 0,
    "veces": 6,
    "explicacion": "Viajan <b>bajo precinto aduanero</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿Quién asigna a los transportistas los cuadernos TIR?",
    "opciones": [
      "La Comunidad Europea.",
      "El Comité de Gestión del Convenio TIR.",
      "Las autoridades aduaneras.",
      "Las asociaciones garantes de los transportes TIR."
    ],
    "correcta": 3,
    "veces": 5,
    "explicacion": "Los asignan las <b>asociaciones garantes</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿Cuándo se puede utilizar el régimen TIR para una operación de tránsito de un punto a otro del territorio aduanero de la Unión Europea con mercancías no pertenecientes a la Unión?",
    "opciones": [
      "En las operaciones de tránsito entre los Estados miembros de la Unión Europea.",
      "En operaciones de tránsito que tengan como destino un país fuera del continente.",
      "En ningún caso.",
      "En operaciones de tránsito que atraviesen en su recorrido un territorio situado fuera del territorio aduanero de la Unión que pertenezca a un Estado firmante del Convenio TIR."
    ],
    "correcta": 3,
    "veces": 5,
    "explicacion": "Solo si el camino pasa por un territorio de afuera de la UE de un país del Convenio TIR.",
    "paso": 8
  },
  {
    "enunciado": "Para iniciar un transporte TIR, ¿qué se debe presentar en la aduana de partida?",
    "opciones": [
      "La mercancía.",
      "La mercancía y el vehículo.",
      "La mercancía, el vehículo y el cuaderno TIR.",
      "La mercancía, el vehículo, el cuaderno TIR y el justificante de garantía."
    ],
    "correcta": 2,
    "veces": 3,
    "explicacion": "Hay que presentar <b>la mercancía, el vehículo y el cuaderno</b>.",
    "paso": 8
  },
  {
    "enunciado": "En un transporte efectuado en régimen TIR:",
    "opciones": [
      "las mercancías viajan, por regla general, bajo precinto aduanero.",
      "las mercancías viajan, por regla general, acompañadas de un agente de aduanas.",
      "las mercancías viajan, por regla general, con escolta policial.",
      "Ninguna de las respuestas anteriores es correcta."
    ],
    "correcta": 0,
    "veces": 3,
    "explicacion": "Viajan <b>bajo precinto aduanero</b>.",
    "paso": 8
  },
  {
    "enunciado": "Como regla general, en un transporte TIR las aduanas de tránsito...",
    "opciones": [
      "efectuarán una inspección de parte de la carga.",
      "efectuarán una inspección de toda la carga.",
      "no efectuarán inspección de la carga.",
      "En un transporte TIR no hay aduanas de tránsito."
    ],
    "correcta": 2,
    "veces": 3,
    "explicacion": "Por regla general, las aduanas de tránsito <b>no revisan</b> la carga.",
    "paso": 8
  },
  {
    "enunciado": "¿En qué lugar debe ir colocada la placa indicativa de un transporte en régimen TIR?",
    "opciones": [
      "En la parte trasera del vehículo.",
      "En la parte lateral del vehículo.",
      "En la parte delantera y en la trasera del vehículo.",
      "En la parte anterior del vehículo."
    ],
    "correcta": 2,
    "veces": 3,
    "explicacion": "Va <b>adelante y atrás</b> del vehículo.",
    "paso": 8
  },
  {
    "enunciado": "¿En cuántas partes se divide el territorio aduanero de la Unión Europea a los efectos de un transporte en régimen de tránsito efectuado al amparo del Convenio TIR?",
    "opciones": [
      "En dos: zona euro y zona de países que no han adoptado el euro como moneda.",
      "En tres: zona euro, zona de países que no han adoptado el euro como moneda y Reino Unido.",
      "En tantas como Estados formen parte de la Unión Europea en cada momento.",
      "En un transporte TIR, el territorio aduanero de la Unión se considera como un solo territorio."
    ],
    "correcta": 3,
    "veces": 3,
    "explicacion": "Para el TIR, la UE cuenta como <b>un solo territorio</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿Se exige alguna aprobación específica de los vehículos que se utilizan en un transporte TIR?",
    "opciones": [
      "No, sólo que vayan identificados con la placa TIR.",
      "No, sólo que vayan identificados con la placa TIR y estén matriculados en el país de partida del transporte.",
      "Sí, están sujetos a aprobación y deben obtener un certificado.",
      "Se requiere su aprobación previa, pero sólo para el transporte de mercancías que presentan un mayor riesgo de fraude (tabaco, alcohol y similares)."
    ],
    "correcta": 2,
    "veces": 2,
    "explicacion": "<b>Sí</b>: los vehículos se aprueban y tienen un certificado.",
    "paso": 8
  },
  {
    "enunciado": "¿Se exige alguna aprobación específica de los vehículos que se utilizan en un transporte TIR?",
    "opciones": [
      "No, solo que vayan identificados con la placa TIR.",
      "No, solo que vayan identificados con la placa TIR y estén matriculados en el país de partida del transporte.",
      "Sí, están sujetos a aprobación y deben obtener un certificado.",
      "Se requiere su aprobación previa, pero solo para el transporte de mercancías que presentan un mayor riesgo de fraude (tabaco, alcohol y similares)."
    ],
    "correcta": 2,
    "veces": 2,
    "explicacion": "<b>Sí</b>: los vehículos se aprueban y tienen un certificado.",
    "paso": 8
  },
  {
    "enunciado": "¿Para cuántos viajes sirve cada cuaderno TIR?",
    "opciones": [
      "Para uno.",
      "Para tres.",
      "Para cinco.",
      "Para todos los que se realicen dentro de su período de validez."
    ],
    "correcta": 0,
    "veces": 2,
    "explicacion": "Cada cuaderno sirve para <b>un viaje</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿En qué año se firmó el Convenio TIR?",
    "opciones": [
      "1975.",
      "1980.",
      "1983.",
      "1985."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "El Convenio TIR es de <b>1975</b>.",
    "paso": 8
  },
  {
    "enunciado": "Las mercancías que viajan en régimen TIR deben ir acompañadas de:",
    "opciones": [
      "una autorización bilateral siempre.",
      "un transitario.",
      "un cuaderno que sirve como documento de control a las diferentes aduanas.",
      "una licencia comunitaria siempre."
    ],
    "correcta": 2,
    "veces": 1,
    "explicacion": "Van con un <b>cuaderno</b> que sirve de control en las aduanas.",
    "paso": 8
  },
  {
    "enunciado": "¿Qué asociaciones pueden expedir cuadernos TIR?",
    "opciones": [
      "Todas las asociaciones profesionales de transportistas.",
      "Las asociaciones profesionales de transportistas que forman parte del Comité Nacional de Transporte por Carretera.",
      "Las asociaciones autorizadas por la Administración aduanera.",
      "Las asociaciones autorizadas por el Comité de Gestión del Convenio TIR."
    ],
    "correcta": 2,
    "veces": 1,
    "explicacion": "Las <b>autorizadas por la Administración aduanera</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿Qué transportistas pueden efectuar transportes en régimen TIR?",
    "opciones": [
      "Todos los que dispongan de licencia comunitaria.",
      "Todos los que dispongan de autorización MDP.",
      "Todos los que hayan sido autorizados al efecto por el Comité de Gestión del Convenio TIR.",
      "Todos los que hayan sido autorizados al efecto por las autoridades aduaneras."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Los transportistas <b>autorizados por las autoridades aduaneras</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿En qué año se firmó el Convenio TIR?",
    "opciones": [
      "1970.",
      "1975.",
      "1980.",
      "1985."
    ],
    "correcta": 1,
    "veces": 1,
    "explicacion": "El Convenio TIR es de <b>1975</b>.",
    "paso": 8
  },
  {
    "enunciado": "El régimen TIR es un tránsito aduanero:",
    "opciones": [
      "solamente para mercancías de la Unión Europea.",
      "para mercancías con origen o destino fuera de la Unión Europea y que parte de su recorrido se realice por carretera.",
      "únicamente para mercancías con origen o destino en España.",
      "únicamente para mercancías con origen o destino entre España y Portugal."
    ],
    "correcta": 1,
    "veces": 1,
    "explicacion": "Para mercancías con <b>origen o destino fuera de la UE</b> y parte del viaje por carretera.",
    "paso": 8
  },
  {
    "enunciado": "¿En qué lugar debe ir colocada la placa indicativa de un transporte en régimen TIR?",
    "opciones": [
      "En la parte trasera y en los laterales del vehículo.",
      "En los laterales del vehículo.",
      "En la parte delantera y en la trasera del vehículo.",
      "En la parte delantera y en los laterales del vehículo."
    ],
    "correcta": 2,
    "veces": 1,
    "explicacion": "Va <b>adelante y atrás</b> del vehículo.",
    "paso": 8
  },
  {
    "enunciado": "¿Para cuántos viajes sirve cada cuaderno TIR?",
    "opciones": [
      "Para uno.",
      "Para tres.",
      "Para cinco.",
      "Para todos los que se realicen dentro de su periodo de validez."
    ],
    "correcta": 0,
    "veces": 1,
    "explicacion": "Cada cuaderno sirve para <b>un viaje</b>.",
    "paso": 8
  },
  {
    "enunciado": "¿Cuándo se puede utilizar el régimen TIR para una operación de tránsito de un punto a otro del territorio aduanero de la Unión Europea con mercancías no pertenecientes a la Unión?",
    "opciones": [
      "En las operaciones de tránsito entre los Estados miembros de la Unión Europea.",
      "En operaciones de tránsito que tengan como destino un país fuera del continente.",
      "En ningún caso.",
      "En operaciones de tránsito que atraviesen en su recorrido un territorio situado fuera del territorio aduanero de la Unión, que pertenezca a un Estado firmante del Convenio TIR."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Solo si el camino pasa por un territorio de afuera de la UE de un país del Convenio TIR.",
    "paso": 8
  },
  {
    "enunciado": "En el ámbito de la Unión Europea, ¿cuál es el límite de responsabilidad a la que deben hacer frente las asociaciones garantes por cada cuaderno TIR?",
    "opciones": [
      "50.000 euros.",
      "60.000 euros.",
      "75.000 euros.",
      "100.000 euros."
    ],
    "correcta": 1,
    "veces": 1,
    "explicacion": "Hasta <b>60.000 €</b> por cuaderno.",
    "paso": 8
  },
  {
    "enunciado": "En un transporte en régimen TIR, ¿cuál es el número máximo de aduanas de salida y de destino que se permite?",
    "opciones": [
      "Dos.",
      "Cuatro.",
      "Cinco.",
      "Diez."
    ],
    "correcta": 1,
    "veces": 1,
    "explicacion": "Como mucho <b>4</b> aduanas de salida y de destino.",
    "paso": 8
  },
  {
    "enunciado": "¿En qué transportes se puede utilizar el régimen TIR?",
    "opciones": [
      "En todos los que tengan origen o destino fuera de España.",
      "En todos los que tengan como origen o destino la Unión Europea o un país tercero firmante del Convenio TIR.",
      "En todos los que tengan como origen o destino un país firmante del Convenio TIR.",
      "En los que tengan como origen o destino un país firmante del Convenio TIR no perteneciente a la Unión Europea."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "Cuando el origen o destino es un país del Convenio TIR que <b>no es de la UE</b>.",
    "paso": 8
  },
  {
    "enunciado": "El régimen ATA es un régimen de tránsito aduanero utilizado para:",
    "opciones": [
      "el transporte de mercancías en avión, únicamente.",
      "el transporte de mercancías dentro de la Unión Europea, únicamente.",
      "la importación temporal de mercancías, como exposiciones, entre los países firmantes.",
      "el transporte multimodal de mercancías entre países del EEE únicamente."
    ],
    "correcta": 2,
    "veces": 14,
    "explicacion": "Para la <b>importación temporal</b>, como exposiciones.",
    "paso": 9
  },
  {
    "enunciado": "¿Qué es el régimen ATA?",
    "opciones": [
      "Es un régimen aduanero utilizado para el movimiento de mercancía sensible.",
      "Es un régimen aduanero utilizado para el transporte especial.",
      "Es un régimen aduanero utilizado para el transporte de material bélico.",
      "Es un régimen aduanero utilizado para la importación temporal."
    ],
    "correcta": 3,
    "veces": 13,
    "explicacion": "El ATA es para la <b>importación temporal</b>.",
    "paso": 9
  },
  {
    "enunciado": "¿Cuál es el plazo máximo de reexportación de una mercancía importada al amparo de un cuaderno ATA?",
    "opciones": [
      "Seis meses.",
      "Quince meses.",
      "El plazo de vigencia del cuaderno ATA correspondiente.",
      "El plazo de caducidad de la mercancía."
    ],
    "correcta": 2,
    "veces": 6,
    "explicacion": "Hasta que vence el <b>cuaderno ATA</b>.",
    "paso": 9
  },
  {
    "enunciado": "El régimen ATA es un régimen de tránsito aduanero utilizado para:",
    "opciones": [
      "el transporte de mercancías en avión únicamente.",
      "el transporte de mercancías dentro de la Unión Europea únicamente.",
      "la importación temporal de mercancías, como exposiciones, entre los países firmantes.",
      "el transporte de mercancías entre España y Portugal únicamente."
    ],
    "correcta": 2,
    "veces": 4,
    "explicacion": "Para la <b>importación temporal</b>, como exposiciones.",
    "paso": 9
  },
  {
    "enunciado": "El régimen ATA es un régimen de tránsito aduanero utilizado para:",
    "opciones": [
      "el transporte de mercancías en avión, únicamente.",
      "el transporte de mercancías dentro de la Unión Europea, únicamente.",
      "la importación temporal de mercancías entre los países firmantes del Acuerdo ATA, como por ejemplo para exposiciones.",
      "el transporte de mercancías entre España y Portugal, únicamente."
    ],
    "correcta": 2,
    "veces": 4,
    "explicacion": "Para la <b>importación temporal</b>, como exposiciones.",
    "paso": 9
  },
  {
    "enunciado": "El régimen ATA es un régimen de tránsito aduanero utilizado para:",
    "opciones": [
      "el transporte de mercancías en avión, únicamente.",
      "el transporte de mercancías dentro de la Unión Europea, únicamente.",
      "la importación temporal de mercancías, como exposiciones, entre los países firmantes.",
      "el transporte multimodal de mercancías entre países del EEE, únicamente."
    ],
    "correcta": 2,
    "veces": 4,
    "explicacion": "Para la <b>importación temporal</b>, como exposiciones.",
    "paso": 9
  },
  {
    "enunciado": "¿Puede utilizarse el cuaderno ATA como documento válido para transportar mercancías en régimen de tránsito aduanero?",
    "opciones": [
      "Sí.",
      "Sí, pero solo para mercancías que no presenten un nivel elevado de fraude.",
      "No, el cuaderno ATA debe estar acompañado siempre por el cuaderno TIR.",
      "No, el cuaderno ATA debe estar acompañado siempre por el cuaderno TIR o por el documento de tránsito comunitario."
    ],
    "correcta": 0,
    "veces": 3,
    "explicacion": "<b>Sí</b>: el cuaderno ATA vale como documento de tránsito.",
    "paso": 9
  },
  {
    "enunciado": "¿En cuál de los siguientes supuestos se puede utilizar un cuaderno ATA?",
    "opciones": [
      "Importación de mercancías para su utilización en exposiciones y ferias.",
      "Importación de vehículos nuevos para su venta.",
      "Importación de vehículos usados para su venta.",
      "Las respuestas B y C son correctas."
    ],
    "correcta": 0,
    "veces": 3,
    "explicacion": "Para <b>exposiciones y ferias</b>. No para vender vehículos.",
    "paso": 9
  },
  {
    "enunciado": "¿Cuál es el plazo máximo de vigencia permitido para los cuadernos ATA?",
    "opciones": [
      "Seis meses.",
      "Ocho meses.",
      "Un año.",
      "Quince meses."
    ],
    "correcta": 2,
    "veces": 3,
    "explicacion": "Dura como mucho <b>1 año</b>.",
    "paso": 9
  },
  {
    "enunciado": "Las mercancías introducidas en un país al amparo de un cuaderno ATA deberán:",
    "opciones": [
      "ser destinadas a la venta en el mismo.",
      "ser objeto de transformación en el mismo.",
      "permanecer en el país hasta que expire la vigencia del cuaderno.",
      "ser reexportadas."
    ],
    "correcta": 3,
    "veces": 2,
    "explicacion": "Tienen que ser <b>reexportadas</b>.",
    "paso": 9
  },
  {
    "enunciado": "¿Qué cubre la garantía asociada a los cuadernos ATA?",
    "opciones": [
      "El precio de los bienes importados, en caso de que no se pague por su destinatario.",
      "Los impuestos y gravámenes derivados de la importación de los bienes.",
      "El coste del transporte.",
      "Todas las respuestas anteriores son correctas."
    ],
    "correcta": 1,
    "veces": 1,
    "explicacion": "Cubre los <b>impuestos de la importación</b>.",
    "paso": 9
  },
  {
    "enunciado": "Cuando se utiliza un cuaderno ATA para un transporte en régimen de tránsito, ¿en cuántas partes se considera dividido el territorio aduanero de la Unión Europea?",
    "opciones": [
      "En dos: zona euro y zona de países que mantienen su propia moneda.",
      "En tantas como Estados formen parte de la Unión Europea en cada momento.",
      "Se considera como un solo territorio.",
      "Ninguna de las respuestas es correcta."
    ],
    "correcta": 2,
    "veces": 1,
    "explicacion": "Se considera <b>un solo territorio</b>.",
    "paso": 9
  },
  {
    "enunciado": "¿Qué es el régimen ATA?",
    "opciones": [
      "Es un régimen aduanero utilizado para el movimiento de mercancía sensible.",
      "Es un régimen aduanero utilizado para transportes especiales.",
      "Es un régimen aduanero utilizado para el transporte de material bélico.",
      "Es un régimen aduanero utilizado para la importación temporal."
    ],
    "correcta": 3,
    "veces": 1,
    "explicacion": "El ATA es para la <b>importación temporal</b>.",
    "paso": 9
  }
];
