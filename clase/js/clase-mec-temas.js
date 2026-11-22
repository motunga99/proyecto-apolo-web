// ==========================================
// MECÁNICA, CONSUMO Y MARCHAS: los 7 capítulos
// Todo sale de las preguntas oficiales de Mercancías. Explicado para quien nunca abrió un capó.
// ==========================================

const preguntas = (tipo, titulo) => ({ tipo, titulo, texto: [], sim: 'quieto', vista: 'perspectiva', quiz: true });

// ---------------- CAPÍTULO 1: EL MOTOR ----------------
export const PASOS_MEC_MOTOR = [
  {
    tipo: 'motor', titulo: '¿Para qué sirve el motor y de qué está hecho?',
    texto: [
      "<b>¿Qué hace el motor?</b> Quema gasoil y con eso hace girar las ruedas. O sea: convierte el combustible en movimiento.",
      "El examen lo dice con palabras difíciles: el motor transforma <b>energía química</b> (la que tiene guardada el gasoil) en <b>energía mecánica</b> (movimiento). Quemar el gasoil se llama <b>combustión</b>.",
      "Los motores de camión son de <b>cuatro tiempos</b>: repiten 4 pasos todo el tiempo (lo ves en el paso 3).",
      "<b>Pensalo como una casa de 4 pisos</b> (mirá la animación, se arma de abajo hacia arriba):<br>• <b>1 · Cárter:</b> el sótano. Es la <b>bandeja de abajo</b> donde se <b>guarda el aceite</b>. Tiene un tapón para vaciarlo.<br>• <b>2 · Bloque:</b> la planta baja, la parte más grande. Adentro tiene unos <b>tubos</b> llamados <b>cilindros</b>, donde sube y baja una pieza (el pistón).<br>• <b>3 · Culata:</b> el techo de los cilindros. Los <b>tapa por arriba</b>. Tiene <b>agujeritos</b> por donde entra el aire y salen los humos, y unas \"puertitas\" que los abren y cierran: las <b>válvulas</b>. Justo debajo hay un hueco donde se quema el gasoil: la <b>cámara de compresión</b>.<br>• <b>4 · Tapa de balancines:</b> la tapa de arriba de todo. Ahí está el <b>tapón para echar aceite</b>.",
      "<b>Truco para el orden:</b> de abajo hacia arriba: <b>cárter, bloque, culata, tapa de balancines</b>.",
      "<b>Junta de culata:</b> es como el burlete de una heladera. Va <b>entre la culata y el bloque</b> para que <b>no se escape nada</b>. Tiene agujeros que coinciden con los del bloque. Si se rompe, se mezclan cosas: puede pasar <b>líquido del radiador a donde se quema el gasoil</b>, o humo a los caños del líquido.",
      "<b>Camisas:</b> son tubos que van adentro del cilindro, por donde se mueve el pistón, cuando se pueden sacar del bloque (como un forro).",
      "<b>Ojo, no son parte del motor:</b> el diferencial y los frenos. Y el cigüeñal no es parte del bloque: va apoyado en él."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'piezas', titulo: 'El motor desarmado', texto: 'Se prende una pieza por vez, de abajo hacia arriba: cárter, bloque, junta de culata, culata y tapa de balancines.' }
  },
  {
    tipo: 'motor', titulo: 'Pistón, biela, cigüeñal y volante',
    texto: [
      "<b>Es como andar en bici:</b> tu pierna sube y baja, y el pedal da vueltas. En el motor pasa lo mismo. Mirá la animación.",
      "• <b>Pistón</b> = la pierna. Es como un vaso al revés que <b>sube y baja</b> dentro del cilindro. Es <b>apenas un poquito más chico</b> que el cilindro, para poder moverse.<br>• <b>Biela</b> = el hueso de la pierna. Es una barra que <b>lleva la fuerza del pistón al cigüeñal</b>. Arriba se une al pistón con un pasador llamado <b>bulón</b>. Abajo (su \"cabeza\") se une al <b>codo</b> del cigüeñal.<br>• <b>Cigüeñal</b> = el pedal. Es un eje con \"codos\" que <b>convierte el sube y baja en vueltas</b>. Se apoya en el bloque en unos puntos llamados <b>apoyos</b>.",
      "<b>Segmentos:</b> son <b>aritos de metal</b> que tiene el pistón alrededor, arriba. Hacen de \"burlete\" para que <b>no se escape el humo</b> por los costados. Hay de dos tipos: de <b>compresión</b> y de <b>engrase</b>.<br>Si se gastan: se escapa humo, se junta hollín (le dicen <b>carbonilla</b>), el motor <b>quema aceite</b> y sale vapor cuando abrís el tapón del aceite.",
      "<b>Volante de inercia</b> (o volante motor): no es el volante para doblar. Es una <b>rueda pesada de metal</b> pegada a una punta del cigüeñal. Como pesa, sigue girando sola y hace que el motor <b>gire parejo</b>, sin tirones.<br>• En el borde tiene <b>dientes</b> (una \"corona\"): ahí engancha el <b>motor de arranque</b> cuando das contacto.<br>• Del otro lado va pegado el <b>embrague</b>.<br>• No abre ni cierra válvulas.",
      "<b>Puntos muertos:</b> son los dos puntos donde el pistón frena y cambia de dirección. Arriba de todo: <b>PMS</b> (punto muerto superior). Abajo de todo: <b>PMI</b> (punto muerto inferior).<br><b>Carrera:</b> es el viaje del pistón de arriba a abajo. Ese viaje dura <b>media vuelta del cigüeñal</b>.",
      "<b>Calibre:</b> es lo ancho que es el cilindro por dentro, medido en milímetros.",
      "<b>Lo que convierte la fuerza en vueltas</b> son pistón, biela y cigüeñal. <b>Las válvulas no</b>: ellas solo abren y cierran."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'motor4t', titulo: 'Pistón, biela y cigüeñal', texto: 'El pistón sube y baja; la biela empuja el codo del cigüeñal y lo hace girar.' }
  },
  {
    tipo: 'motor', titulo: 'Los 4 tiempos del motor diésel',
    texto: [
      "El motor hace <b>4 pasos, uno detrás del otro, todo el tiempo</b>. Mirá la animación:",
      "<b>1) Admisión = respirar.</b> El pistón baja y <b>entra aire</b>. En el diésel entra <b>solo aire</b>, nada de gasoil.<br><b>2) Compresión = apretar.</b> El pistón sube y <b>aprieta el aire</b> muy fuerte. Al apretarlo tanto, <b>el aire se calienta muchísimo</b> (como cuando inflás una rueda y el inflador se calienta).<br><b>3) Combustión = el empujón.</b> Ahí <b>tiran el gasoil</b> como un spray finito. Con el aire tan caliente, <b>se prende solo</b> y empuja el pistón para abajo. Es el único paso que hace fuerza: por eso se llama <b>tiempo motor</b>.<br><b>4) Escape = largar el humo.</b> El pistón sube y <b>saca el humo</b>.",
      "<b>Trampa:</b> el diésel <b>no tiene bujías ni chispa</b>. Y al paso 3 no se le dice \"explosión\", se le dice <b>combustión</b>.",
      "<b>La distribución:</b> es el \"reloj\" que <b>abre y cierra las válvulas</b> en el momento justo. Hay un eje llamado <b>árbol de levas</b> que empuja las válvulas, y lo hace girar el <b>cigüeñal</b> con piñones, una cadena o una correa con dientes. Por eso las válvulas van al ritmo de los pistones.",
      "<b>En la realidad, todo pasa un poquito antes o un poquito después:</b><br>• La válvula de aire abre <b>un poco antes</b> de que el pistón llegue arriba.<br>• La válvula de humo abre <b>un poco antes</b> de que el pistón llegue abajo, y cierra <b>un poco después</b> de que pase arriba.<br>• El gasoil se tira <b>un poco antes</b> de que el pistón llegue arriba.",
      "<b>Si las válvulas abren o cierran tarde:</b> el motor <b>pierde fuerza y gasta más</b>. Por eso el \"reloj\" (la distribución) tiene que estar bien regulado.",
      "<b>Dato:</b> el caño que junta el humo de todos los cilindros (colector de escape) tiene <b>un tubo por cada cilindro</b>."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'motor4t', titulo: 'Los 4 tiempos', texto: 'Admisión (aire), compresión (se calienta), combustión (gasoil, empuja), escape (salen los gases).' }
  },
  {
    tipo: 'motor', titulo: 'Cilindrada, cilindros y válvulas',
    texto: [
      "<b>Cilindrada:</b> es <b>cuánto entra en todos los cilindros juntos</b>. Se calcula así: lo que entra en un cilindro <b>multiplicado</b> por la cantidad de cilindros. Mirá la animación: 4 cilindros de 3 litros = 12 litros.",
      "<b>Más cilindrada = más potencia</b> (más fuerza para correr).",
      "<b>Relación de compresión:</b> cuánto se aprieta el aire. Compara cuánto lugar ocupa el aire <b>antes</b> de apretarlo con cuánto ocupa <b>después</b>.",
      "<b>Más cilindros = el motor anda más suave.</b> Uno de 6 cilindros anda más parejo que uno de 4.",
      "<b>¿Qué es una válvula?</b> Es una <b>puertita</b> que tiene cada cilindro arriba (en la culata, el \"techo\" del cilindro). Parece un clavo grande con la cabeza redonda: cuando baja, <b>abre el agujero</b>; cuando sube, <b>lo tapa</b>. Se abre y se cierra sola, en el momento justo.<br>• Una deja <b>entrar el aire</b> al cilindro (válvula de admisión).<br>• Otra deja <b>salir el humo</b> (válvula de escape).<br>Lo normal son <b>2 por cilindro</b>: una para el aire y otra para el humo.",
      "<b>4 válvulas por cilindro</b> en vez de 2 (dos para el aire y dos para el humo): es como tener más puertas: <b>entra y sale mejor el aire</b>."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'cilindrada', titulo: 'Cilindrada', texto: 'Se llena cada cilindro: 3 litros cada uno. Los 4 juntos = 12 litros. Eso es la cilindrada.' }
  },
  {
    tipo: 'motor', titulo: 'Repaso: el motor',
    texto: [
      "<b>Qué hace:</b> quema gasoil y lo convierte en movimiento (energía química → energía mecánica). Es de cuatro tiempos.",
      "<b>Los 4 pisos:</b> cárter (abajo, aceite) → bloque (los cilindros) → culata (tapa de los cilindros, válvulas) → tapa de balancines (tapón del aceite). La junta de culata va entre la culata y el bloque.",
      "<b>Como una bici:</b> pistón (pierna) → biela (hueso) → cigüeñal (pedal). Segmentos: aritos que no dejan escapar el humo. Volante: rueda pesada; ahí engancha el arranque y va el embrague.",
      "<b>4 tiempos:</b> respirar aire, apretar (se calienta), empujón (tiran gasoil y se prende solo), largar el humo. Sin bujías.",
      "<b>Cilindrada:</b> lo que entra en un cilindro × cantidad de cilindros. Más cilindros, más suave."
    ],
    sim: 'quieto', vista: 'perspectiva'
  },
  preguntas('motor', 'Preguntas oficiales: el motor')
];

// ---------------- CAPÍTULO 2: COMBUSTIBLE, AIRE Y TURBO ----------------
export const PASOS_MEC_ALIMENTACION = [
  {
    tipo: 'alimentacion', titulo: 'El combustible: de dónde viene y cómo entra',
    texto: [
      "El <b>sistema de alimentación</b> es el que le da de \"comer\" al motor: <b>aire y gasoil</b>. Junto con el escape, hace entrar aire y gasoil y salir el humo.",
      "<b>El viaje del gasoil</b> (mirá las gotitas en la animación):<br>1. Del <b>tanque</b> lo saca la <b>bomba de alimentación</b>.<br>2. Lo manda a la <b>bomba de inyección</b>.<br>3. De ahí va a los <b>inyectores</b>, que lo tiran adentro del cilindro como un <b>spray finito</b>.",
      "<b>Inyección directa:</b> el gasoil se tira directo al hueco donde se quema, la <b>cámara de compresión</b>. Ahí se mezcla con el aire caliente y se prende.",
      "<b>¿Qué no deja que el motor se pase de vueltas?</b> El <b>corte de inyección</b>: cuando llega al máximo, deja de tirar gasoil. En los motores con bomba, ese freno está en la <b>bomba inyectora</b>.",
      "<b>Filtro de combustible:</b> limpia el gasoil. Se cambia <b>cuando lo dice el fabricante</b>. Para saber cuándo cambiar los filtros, el conductor tiene que llevar la cuenta de los <b>kilómetros</b>. Ojo: \"filtro del líquido de frenos\" <b>no existe</b>.",
      "<b>¿De dónde sale?</b> El gasoil sale del <b>petróleo</b>. El <b>biodiésel</b> es un combustible \"ecológico\" que pueden usar algunos motores de gasoil. Sale de <b>plantas que dan aceite</b> (oleaginosas: <b>soja, girasol</b>) y también de <b>aceite de freír usado</b>.",
      "Si la alimentación está mal regulada, el motor <b>pierde fuerza y gasta más</b>."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'inyeccion', titulo: 'El camino del gasoil', texto: 'Del tanque al cilindro: el inyector lo tira en gotitas arriba del pistón, donde el aire está calentísimo, y se prende solo.' }
  },
  {
    tipo: 'alimentacion', titulo: 'El aire: el filtro y el turbo',
    texto: [
      "Para que el gasoil se queme bien hace falta <b>mucho aire</b>. Es como un fuego: sin aire, se ahoga y larga <b>humo negro</b>.",
      "<b>El filtro de aire</b> limpia el aire que entra. Si está <b>sucio</b>, entra poco aire y pasan dos cosas:<br>• sale <b>humo negro</b> por el escape;<br>• el camión <b>gasta más</b>.<br>Por eso se cambia <b>cuando lo dice el fabricante</b>. Cambiarlo ayuda a ahorrar. Si con el motor caliente sale mucho humo negro, es que <b>no se está quemando todo el gasoil</b>.",
      "<b>Con el motor muy acelerado</b> (muchas vueltas), el aire <b>no llega a entrar</b>: todo pasa demasiado rápido. Por eso, aunque pises a fondo, no hay aire ni tiempo para quemar todo el gasoil. El cilindro se llena mejor con el motor <b>a medias vueltas</b>.",
      "<b>Sin turbo</b> (le dicen motor \"atmosférico\"), el aire entra porque <b>el pistón lo chupa</b> al bajar, como una jeringa.",
      "<b>El turbo</b> (mirá la animación) son <b>dos molinitos unidos por un mismo eje</b>:<br>• El <b>humo del escape</b> sale con fuerza y hace girar un molinito (la <b>turbina</b>, que está <b>en el escape</b>).<br>• El otro molinito (el <b>compresor</b>, que está <b>en la entrada de aire</b>) gira junto y <b>mete más aire</b> al motor.<br>Resultado: <b>más potencia sin agrandar el motor</b> (sin más cilindrada). Es como soplarle a una fogata.",
      "<b>El camino del aire con turbo:</b> filtro de aire → turbo → <b>intercooler</b> (un radiadorcito que enfría el aire) → cilindro. El filtro va <b>antes</b> del turbo.",
      "<b>Cuidar el turbo:</b> se engrasa con <b>el mismo aceite del motor</b>. Así que hay que cambiar el aceite a tiempo y del tipo que pide el fabricante. Con el motor <b>frío</b>, no lo exijas a fondo: todavía no le llegó el aceite y se puede romper."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'turbo', titulo: 'El turbo', texto: 'El humo que sale del motor hace girar un molinito; el otro molinito gira junto y le mete más aire al motor.' }
  },
  {
    tipo: 'alimentacion', titulo: 'Repaso: combustible, aire y turbo',
    texto: [
      "<b>Gasoil:</b> tanque → bomba de alimentación → bomba de inyección → inyectores (spray). Se quema en la cámara de compresión. El corte de inyección no deja pasarse de vueltas.",
      "<b>Biodiésel:</b> de plantas con aceite (soja, girasol) o de aceite de freír usado.",
      "<b>Filtro de aire sucio:</b> humo negro y gasta más. Se cambia cuando dice el fabricante.",
      "<b>Turbo:</b> el humo mueve un molinito (en el escape) y el otro mete más aire (en la entrada). Más potencia sin más cilindrada. Filtro → turbo → intercooler → cilindro. Usa el aceite del motor; en frío, no exigirlo."
    ],
    sim: 'quieto', vista: 'perspectiva'
  },
  preguntas('alimentacion', 'Preguntas oficiales: combustible, aire y turbo')
];

// ---------------- CAPÍTULO 3: POTENCIA, PAR Y ZONA VERDE ----------------
export const PASOS_MEC_CURVAS = [
  {
    tipo: 'curvas', titulo: 'La potencia',
    texto: [
      "<b>Potencia = qué tan rápido puede hacer el trabajo el motor.</b> Dos personas pueden subir la misma bolsa por la escalera; la que lo hace más rápido tiene más potencia.",
      "El examen la define así: <b>la cantidad de trabajo que hace el motor en cierto tiempo</b>. Y se calcula multiplicando <b>el par (la fuerza) por las vueltas</b>.",
      "<b>¿En qué se mide?</b><br>• En <b>kilovatios (kW)</b>: lo más usado.<br>• En <b>vatios (W)</b>, en el Sistema Internacional (1 kilovatio = 1.000 vatios).<br>• En <b>caballos de vapor (CV)</b>.<br>Cuentas: <b>1 kW = 1,36 CV</b> y <b>1 CV = 0,736 kW</b>.",
      "<b>¿Cuándo tiene más potencia?</b> Cuanto más acelerado está el motor, más potencia. Llega al máximo <b>cerca de las vueltas máximas</b>. Lo que más la cambia es <b>el número de vueltas</b>. Un motor más grande (más cilindrada) tiene más potencia. La forma del camión (aerodinámica) no cambia la potencia.",
      "<b>Pero ojo:</b> usar toda la potencia <b>gasta muchísimo</b>. <b>Más potencia = más gasto.</b> Para ahorrar: <b>pedile al motor menos potencia</b>. Tampoco conviene un camión con más potencia de la que necesita: lo mejor es que la potencia vaya <b>de acuerdo con el peso</b> que lleva.",
      "<b>¿Cuánta potencia piden las ruedas?</b> Depende de <b>la velocidad, la cuesta y la carga</b>. Vos la manejás con <b>el acelerador y eligiendo la marcha</b>, y hay varias formas de lograr la misma potencia.",
      "<b>Datos:</b> el fabricante da los valores <b>máximos</b> de potencia y de par, y están en <b>los papeles del vehículo</b>. La potencia máxima del motor da la mayor potencia en la rueda. La \"potencia fiscal\" del impuesto <b>no tiene nada que ver</b>."
    ],
    sim: 'zona', vista: 'costado',
    figura: { img: 'cuentarrevoluciones', titulo: 'Cuentarrevoluciones', texto: 'Mide las vueltas del motor por minuto. Mirá la aguja en la cabina.' }
  },
  {
    tipo: 'curvas', titulo: 'El par motor: la fuerza de giro',
    texto: [
      "<b>Par motor = la fuerza con que gira el motor.</b> Es como la fuerza que hacés con la llave para aflojar una tuerca: eso también es un <b>par</b>.",
      "De dónde viene: el humo quemado empuja el pistón, y el pistón empuja al cigüeñal. <b>Ese empujón es el par.</b>",
      "<b>¿En qué se mide?</b> En <b>newton por metro (Nm)</b>, en el Sistema Internacional. También en kilos por metro (kg·m). Se mide en el <b>volante de inercia</b>, en la punta del cigüeñal.",
      "<b>¿Cuándo tiene más fuerza?</b> Con el motor <b>a medias vueltas</b> y el acelerador a fondo. Ahí el cilindro se llena bien de aire y se puede quemar mucho gasoil. Más aire adentro = más fuerza. Más acelerador = más fuerza.",
      "<b>Cómo cambia la fuerza:</b> al acelerar, la fuerza <b>primero sube, llega al máximo y después baja</b>.<br>• <b>Al ralentí</b> (parado sin acelerar): fuerza <b>mínima</b>, apenas para que el motor siga girando.<br>• <b>A medias vueltas:</b> fuerza <b>máxima</b>.<br>• <b>A todas las vueltas:</b> más que la mínima pero <b>menos que la máxima</b>, porque no le da el tiempo para llenarse de aire.",
      "<b>La fuerza máxima y la potencia máxima no llegan juntas:</b> la fuerza, a medias vueltas; la potencia, cerca del máximo.",
      "<b>Motor \"elástico\" o \"plano\":</b> el que tiene <b>mucha fuerza en muchas vueltas</b>, no solo en un punto.",
      "<b>Lo más importante:</b> donde el motor tiene más fuerza, <b>es donde menos gasta</b>. A medias vueltas: <b>más fuerza y menos gasto</b>."
    ],
    sim: 'zona', vista: 'costado'
  },
  {
    tipo: 'curvas', titulo: 'Las curvas del motor y el consumo específico',
    texto: [
      "<b>Las curvas del motor</b> son un dibujo (mirá la animación) que muestra <b>cuánta fuerza y cuánta potencia tiene el motor según las vueltas</b>. Se llaman <b>curvas características</b>. Sirven para saber en qué vueltas está lo máximo. No tienen nada que ver con la seguridad pasiva.<br>• Línea naranja: <b>la fuerza (par)</b>. Sube, llega arriba a medias vueltas y baja.<br>• Línea celeste: <b>la potencia</b>. Sube casi hasta el final.<br>• Línea rosa: <b>el gasto</b>. Es más bajo justo en la zona verde.",
      "<b>\"A plena carga\"</b> = con el acelerador <b>a fondo</b>. <b>\"A carga parcial\"</b> = con el acelerador a medias (al 25, al 50 y al 75%).",
      "<b>Consumo específico:</b> cuánto gasoil gasta el motor <b>por cada pedacito de potencia que da</b>. Es como \"cuánto come por cada trabajo que hace\". Se mide en <b>gramos por kilovatio y hora (g/kWh)</b>. Los fabricantes suelen dar el consumo en litros cada 100 km.<br>• Es algo <b>del motor</b>: depende de cómo está fabricado, no de cómo manejás.<br>• <b>Menos consumo específico = motor que rinde mejor.</b>",
      "<b>¿Cuándo gasta menos por trabajo hecho?</b> Con la <b>fuerza máxima y una potencia media</b>: en la parte baja de la zona de fuerza máxima, con el acelerador al 75%. Cuanto menos pisás, más baja el gasto mínimo.",
      "<b>Curvas de equiconsumo</b> (\"de igual gasto\"): se dibujan sobre las de fuerza y marcan los lugares donde el motor gasta lo mismo. Muestran dónde se gasta menos para cada potencia. La zona del <b>\"polo de mínimo consumo\"</b> es la que menos gasta.",
      "<b>¿Qué motor gasta menos?</b> De menos a más:<br>1. <b>diésel de inyección directa</b> (el que menos gasta);<br>2. diésel de inyección indirecta;<br>3. gasolina de inyección directa;<br>4. <b>gasolina de inyección indirecta</b> (el que más gasta).<br>Truco: <b>el diésel gasta menos que la gasolina, y \"directa\" gasta menos que \"indirecta\"</b>."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'curvas', titulo: 'Las curvas del motor', texto: 'La línea blanca recorre las vueltas: en la zona verde el par es alto y el consumo, mínimo.' }
  },
  {
    tipo: 'curvas', titulo: 'El cuentarrevoluciones y la zona verde',
    texto: [
      "El <b>cuentarrevoluciones</b> (o tacómetro) es el reloj que marca <b>cuántas vueltas por minuto da el motor</b>. Mirá la aguja en la cabina, abajo a la derecha.",
      "<b>La zona verde</b> es la <b>zona donde menos gastás</b> (la zona económica). Está cerca de donde el motor tiene más fuerza. La marcan la potencia, la fuerza máxima y el consumo específico del motor. No dependen de piezas sueltas (el cigüeñal, el pistón, la culata, el embrague, los frenos) ni del largo del camión. <b>Fuera de la zona verde, gastás más.</b>",
      "La aguja va <b>desde el ralentí</b> (lo mínimo, parado) <b>hasta el máximo</b>, donde se corta el gasoil. En el medio, aire, gasoil y tiempo están en equilibrio.",
      "<b>Mirá el camión acelerando:</b> va subiendo de marcha. Cuando la aguja llega <b>arriba de la zona verde</b>, cambia. Después del cambio, la aguja cae <b>al principio de la zona verde</b>. En diésel conviene cambiar entre <b>1.500 y 2.000 vueltas</b>.",
      "<b>¿Dónde poner la aguja?</b><br>• <b>En llano:</b> en la parte <b>izquierda</b> de la zona verde (pocas vueltas), cerca de la fuerza máxima.<br>• <b>En subida:</b> en la parte <b>derecha</b> (más vueltas, más fuerza). Si la aguja <b>se cae de la zona verde</b>, poné una marcha más corta.",
      "<b>Al entrar a una autovía:</b> cambiá de marcha en la parte alta de la fuerza máxima."
    ],
    sim: 'zona', vista: 'costado',
    alEstado: {
      acelera: e => e.etiqueta('A', 'Acelera: la aguja sube', 'aviso'),
      cambia: e => e.etiqueta('A', 'Arriba de la zona verde: cambia y la aguja vuelve al principio del verde', 'ok'),
      crucero: e => e.etiqueta('A', 'En marcha larga: pocas vueltas, gasta poco', 'ok')
    }
  },
  {
    tipo: 'curvas', titulo: 'Repaso: potencia, par y zona verde',
    texto: [
      "<b>Potencia:</b> qué tan rápido hace el trabajo. Se mide en kW (1 kW = 1,36 CV). Máxima cerca de las vueltas máximas. Más potencia, más gasto.",
      "<b>Par:</b> la fuerza de giro. Se mide en Nm. Máxima a medias vueltas; mínima al ralentí. Donde hay más fuerza, se gasta menos.",
      "<b>Consumo específico:</b> cuánto come el motor por trabajo hecho (g/kWh). Depende del motor. Menos = mejor. El que menos gasta: diésel de inyección directa.",
      "<b>Zona verde:</b> donde menos gastás. Llano: izquierda. Subida: derecha. Cambiá arriba del verde; después del cambio, la aguja queda al principio del verde."
    ],
    sim: 'quieto', vista: 'perspectiva'
  },
  preguntas('curvas', 'Preguntas oficiales: potencia, par y zona verde')
];

// ---------------- CAPÍTULO 4: LA TRANSMISIÓN ----------------
export const PASOS_MEC_TRANSMISION = [
  {
    tipo: 'transmision', titulo: 'La transmisión: del motor a las ruedas',
    texto: [
      "La <b>transmisión</b> (el examen también le dice <b>cadena cinemática</b>) es <b>el camino que hace el giro desde el motor hasta las ruedas que empujan</b> (las ruedas motrices). Mirá la animación: la luz recorre las piezas y abajo te dice qué hace cada una.",
      "<b>El camino, en orden:</b> motor → <b>embrague</b> → <b>caja de cambios</b> → <b>árbol de transmisión</b> → <b>grupo cónico y diferencial</b> → <b>palieres</b> → ruedas.",
      "<b>Las ruedas</b> convierten el giro en <b>avance</b>: el camión anda.",
      "<b>No son de la transmisión:</b> el cigüeñal y el volante de inercia (son del motor), el motor de arranque y las luces.",
      "<b>El motor y las ruedas no giran igual:</b> las vueltas de las ruedas dependen de <b>cuánto acelerás y de la marcha que pusiste</b>. Del motor a las ruedas, las vueltas <b>bajan</b> (a eso le dicen \"desmultiplicar\").",
      "<b>Se pierde fuerza en el camino:</b> las piezas rozan entre sí. De toda la energía del gasoil, solo un <b>40%</b> llega a la transmisión.",
      "Entender y usar bien la transmisión <b>te ayuda a gastar menos</b>."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'cadena', titulo: 'La transmisión', texto: 'Motor → embrague → caja → árbol → diferencial → palieres → ruedas.' }
  },
  {
    tipo: 'transmision', titulo: 'El embrague',
    texto: [
      "<b>El embrague conecta o desconecta el motor</b> del resto. Mirá la animación:<br>• <b>Pedal suelto (embragado):</b> un disco se aprieta contra la rueda pesada del motor (el volante) y <b>el motor mueve la caja</b>.<br>• <b>Pedal pisado (desembragado):</b> el disco se separa: <b>el motor gira, pero la caja no</b>. Por eso lo pisás <b>para cambiar de marcha</b>.",
      "<b>No es lo mismo desembragado que punto muerto:</b> desembragado es tener <b>el pedal del embrague pisado</b>. Punto muerto es <b>no tener ninguna marcha puesta</b>.",
      "<b>¿Dónde está?</b> Entre el <b>volante de inercia</b> y la <b>caja de cambios</b>, pegado al volante por la cara de afuera.",
      "<b>Sus piezas</b> (el embrague normal, \"de fricción en seco\"):<br>• <b>Disco:</b> el que pasa o corta el giro del motor a la caja. Gira siempre junto con el <b>eje de entrada de la caja</b> (eje primario). Tiene <b>forros</b> que agarran (como las pastillas de freno) para que <b>no patine</b>, y <b>resortes</b> para que agarre de a poco, sin tirones. Si tiene que pasar más fuerza, el disco es más grande.<br>• <b>Plato de presión:</b> el que <b>aprieta el disco contra el volante</b>. Está entre el disco y la tapa.<br>• <b>Diafragma:</b> el resorte que hace la presión. Es el más usado.",
      "<b>Cómo se acciona:</b> con <b>un pedal</b>. El pedal puede tirar de <b>cables o varillas</b> (mando <b>mecánico</b>) o empujar un <b>líquido</b> (mando <b>hidráulico</b>; su tapón de llenado está <b>al lado del pedal</b> y hay que mirar el nivel cada tanto, antes de arrancar). El pedal debe tener el menor \"juego\" posible sin que rasquen las marchas. Si las marchas rascan, puede ser que el pedal tenga demasiado juego.",
      "<b>Si el embrague patina</b> (el motor se acelera pero el camión no), sin ruidos raros: <b>los forros del disco están gastados</b>.",
      "<b>Embrague hidráulico:</b> no tiene disco: usa <b>aceite</b> y dos ruedas con paletas, una <b>bomba</b> (pegada al volante) que empuja el aceite y una <b>turbina</b> que recibe el empujón. Es <b>automático</b> y va con <b>cajas automáticas</b>. Parado al ralentí no tiene fuerza para mover el camión; al acelerar, sí. <b>Lo malo:</b> gasta más y es más caro."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'embrague', titulo: 'El embrague', texto: 'Pedal suelto: el disco se aprieta al volante. Pedal pisado: se separa.' }
  },
  {
    tipo: 'transmision', titulo: 'La caja de cambios',
    texto: [
      "<b>La caja de cambios</b> (o <b>caja de velocidades</b>) son <b>las marchas</b>. Conecta el motor con el resto y te deja elegir entre <b>fuerza o velocidad</b>, como los cambios de una bici. Por dentro son <b>ruedas con dientes</b> (engranajes). Mirá la animación:",
      "• <b>Marcha corta (1ª):</b> una rueda <b>chica</b> mueve una <b>grande</b>: las ruedas giran <b>más despacio pero con más fuerza</b>. Eso se llama <b>desmultiplicar</b>. Cuanto más desmultiplica, más fuerza a las ruedas. La que más fuerza tiene de todas es la <b>marcha atrás</b>.<br>• <b>Marcha larga (5ª en una caja de 5):</b> una rueda <b>grande</b> mueve una <b>chica</b>: las ruedas giran <b>más rápido que el motor</b> (se <b>multiplican</b> las vueltas). Más velocidad, menos fuerza.",
      "<b>Por dentro:</b> una carcasa llamada <b>cárter</b> (con un aceite espeso llamado valvulina), las ruedas con dientes y la palanca. El <b>eje primario</b> es el que recibe el giro del motor por el embrague. Los ejes se apoyan en <b>cojinetes</b>. El <b>piñón inversor</b> es una ruedita que <b>da vuelta el giro</b> para ir marcha atrás. En la caja \"sincronizada\", las ruedas de dos ejes (secundario e intermediario) están siempre enganchadas.",
      "<b>Sincronizador:</b> es la pieza que se mueve cuando movés la palanca. Iguala las vueltas para que la marcha entre suave y <b>no rasque</b>. Por eso hoy <b>no hace falta el \"doble embrague\"</b>, y hacerlo gasta más.",
      "<b>¿Cuántas marchas?</b> Las cajas manuales de camión tienen entre <b>5 y 16</b>. Los camiones chicos, de reparto corto, entre 6 y 9. Los más pesados tienen más marchas: así siempre encontrás la justa y gastás menos. El <b>grupo divisor y el reductor</b> sirven para tener más marchas y adaptarlas a la carga.",
      "<b>Caja automática:</b> <b>cambia sola</b>, no tocás nada. Por dentro tiene un convertidor de par (con aceite y una rueda con paletas llamada rotor), unas ruedas dentadas especiales (planetarias) y un mando con líquido. Si pisás más el acelerador, pasa a una marcha más alta. <b>Gasta más que la manual.</b>"
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'caja', titulo: 'La caja de cambios', texto: 'Chico mueve grande: más fuerza. Grande mueve chico: más velocidad.' }
  },
  {
    tipo: 'transmision', titulo: 'Árbol, grupo cónico, diferencial y palieres',
    texto: [
      "<b>Árbol de transmisión:</b> es <b>un eje largo</b> que va por debajo del camión y lleva el giro <b>desde la caja de cambios hasta el eje de atrás</b> (al grupo cónico). Lo tienen los vehículos con motor adelante y ruedas que empujan atrás, como los camiones. Los que tienen motor adelante y tracción adelante no lo tienen.",
      "<b>Grupo cónico (piñón y corona):</b> está en el eje de atrás. El árbol gira \"a lo largo\" del camión, y las ruedas giran \"a lo ancho\". El grupo cónico <b>dobla el giro en ángulo recto</b> hacia las ruedas. Además, como el piñón es chico y la corona grande, <b>baja las vueltas y aumenta la fuerza</b>, siempre. Por eso la fuerza en la rueda es <b>siempre mayor</b> que la del motor: la caja y el grupo cónico la multiplican.",
      "<b>Diferencial:</b> también en el eje de atrás. Mirá la animación: <b>en una curva, la rueda de afuera hace más camino</b> que la de adentro (como cuando doblás corriendo en una pista: el de afuera corre más). El diferencial deja que <b>la rueda de afuera gire más</b>. Por eso solo trabaja <b>en las curvas</b>, y la suma de las vueltas de las dos ruedas queda igual.<br>El <b>diferencial autoblocante</b> (funciona solo) frena la rueda que patina.",
      "<b>Palieres:</b> son <b>los dos ejes cortos</b> que llevan el giro del diferencial a cada rueda. Están en el eje que empuja, uno a cada lado del diferencial. Con dos ejes que empujan hay <b>cuatro palieres</b>."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'diferencial', titulo: 'El diferencial', texto: 'En la curva, la rueda de afuera da más vueltas que la de adentro.' }
  },
  {
    tipo: 'transmision', titulo: 'Repaso: la transmisión',
    texto: [
      "<b>Camino del giro:</b> motor → embrague → caja → árbol → grupo cónico y diferencial → palieres → ruedas.",
      "<b>Embrague:</b> conecta o desconecta el motor. Pedal pisado = desembragado. Disco, plato de presión, diafragma. El hidráulico es automático y gasta más.",
      "<b>Caja:</b> las marchas. Corta = más fuerza; larga = más velocidad. El sincronizador hace que no rasquen. La automática gasta más.",
      "<b>Grupo cónico:</b> dobla el giro hacia las ruedas y aumenta la fuerza. <b>Diferencial:</b> en la curva deja que la rueda de afuera gire más. <b>Palieres:</b> uno a cada rueda."
    ],
    sim: 'quieto', vista: 'perspectiva'
  },
  preguntas('transmision', 'Preguntas oficiales: la transmisión')
];

// ---------------- CAPÍTULO 5: GASTAR MENOS ----------------
export const PASOS_MEC_CONSUMO = [
  {
    tipo: 'consumo', titulo: '¿De qué depende lo que gasta el camión?',
    texto: [
      "El gasto se mide en <b>litros cada 100 km</b>. Para saber si estás gastando de más: <b>anotá cuánto cargás y cuántos km hacés</b>.",
      "<b>El gasto depende de dos cosas:</b> de <b>cómo manejás</b> (esto importa muchísimo) y del <b>camión y su motor</b>.",
      "<b>Las cosas que frenan al camión</b> (el examen les dice \"resistencias\"):<br>• <b>El aire</b> (resistencia <b>aerodinámica</b>): siempre empuja <b>en contra</b>. Mirá los dos camiones: el que va más rápido choca contra más aire.<br>• <b>El roce de las ruedas con el piso</b> (resistencia a la <b>rodadura</b>, o al rozamiento). Cargado y despacio, es la que <b>más cuesta</b>.<br>• <b>La cuesta</b> (resistencia a la <b>pendiente</b>).<br>• <b>La inercia</b> (resistencia a la <b>aceleración</b>): un camión pesado cuesta arrancarlo y cuesta frenarlo.<br>Para que el camión se mueva, el motor tiene que hacer más fuerza que todo eso junto.",
      "<b>Lo que SÍ cambia el gasto:</b> las vueltas del motor, la marcha, cuánto pisás el acelerador, la velocidad, las cuestas de la ruta, <b>la carga</b> (sobrecargado gasta más; lo que más ahorra es no cargar de más), la forma del camión, el aire acondicionado, cómo usás los frenos y <b>el mantenimiento</b>.",
      "<b>Lo que NO cambia el gasto</b> (inventos del examen): el color de la carrocería o del motor, el material del motor, el largo del cigüeñal, del pistón o del árbol de levas, el béndix, el voltaje o tipo de batería, el motor de arranque, el generador, dónde están el volante o las ruedas que empujan, la seguridad pasiva, el tipo de frenos, el dámper, la ventilación del cárter, el ecualizador, el corrector de frenada y el \"octanaje del gasóleo\". Tampoco son \"resistencias\" el humo del escape ni \"la energía por la altura\".",
      "<b>¿Dónde se pierde energía en el motor?</b> En el calor que sale por el escape, en el calor que se va por el radiador y en el roce de las piezas. \"La evaporación del combustible\" no.",
      "<b>Mantenimiento:</b> hacerlo cuando dice el fabricante <b>baja el gasto</b>. Un motor mal regulado gasta más. Y manejar ahorrando, además, <b>gasta menos las piezas</b> y el motor dura más. Gastar menos es ecológico <b>y también ahorra plata</b>."
    ],
    sim: 'aire', vista: 'perspectiva',
    alEstado: { andan: e => { e.etiqueta('A', 'A 70 km/h', 'ok'); e.etiqueta('B', 'A 90 km/h: el aire frena más', 'deuda'); } }
  },
  {
    tipo: 'consumo', titulo: 'Las marchas: largas y con pocas vueltas',
    texto: [
      "<b>La regla de oro: cuantas menos vueltas da el motor, menos gasta.</b> Menos vueltas = las piezas rozan menos. Las vueltas las manejás con <b>el acelerador</b> y con <b>la marcha</b>.",
      "<b>Mirá los dos camiones a 70 km/h:</b> van juntos, a la misma velocidad. La diferencia está en los carteles: A va en <b>marcha larga</b>, con pocas vueltas (zona verde). B va en <b>marcha corta</b>, con muchas vueltas (zona roja): gasta mucho más y sus litros suben más rápido. A la misma velocidad, <b>cuanto más corta la marcha, más gasta</b>.",
      "<b>Para ahorrar:</b><br>• andá en la <b>marcha más alta que puedas</b>, con la aguja en la zona verde (además se gastan menos las piezas, hay menos ruido y vas más cómodo);<br>• usá la <b>primera lo menos posible</b>;<br>• al acelerar, <b>cambiá rápido hasta la marcha más larga</b>;<br>• al ir frenando, <b>bajá de marcha lo más tarde posible</b>;<br>• mirá el <b>cuentarrevoluciones</b> o la velocidad para saber cuándo cambiar.",
      "<b>¿De qué depende la marcha correcta?</b> De las vueltas del motor, la velocidad, el peso (si vas cargado o vacío), las cuestas de la ruta y las marchas que tiene la caja. <b>No</b> depende de la temperatura, la presión del aire ni del roce del asfalto. Para subir de marcha no se pisa el freno ni se lleva el motor al máximo.",
      "<b>¿Se pueden saltar marchas?</b> Sí, <b>a veces conviene</b>, tanto en subidas como en bajadas.",
      "<b>En una subida</b> (la vas a ver después en la simulación): cada vez que cambiás, por un segundo <b>nadie empuja</b> (el embrague está pisado), así que el camión <b>pierde fuerza y velocidad</b>. Cuánto pierde depende de lo empinada que sea y del peso. Por eso: <b>hacé los menos cambios posibles</b>, saltando marchas. Así perdés menos velocidad, <b>llegás antes arriba y gastás menos</b>. Si el motor no sube de vueltas aunque aceleres, poné una marcha más corta.",
      "<b>En llano y en bajada:</b> acelerador poco pisado.",
      "<b>Dato:</b> en llano a 70 km/h se gasta menos en <b>octava</b> que en quinta."
    ],
    sim: 'marchas', vista: 'perspectiva',
    linea: [[16, e => e.configurar('subida')]],
    alEstado: {
      andan: e => { e.etiqueta('A', 'A · marcha larga: gasta poco<br><small data-vivo="A"></small>', 'ok'); e.etiqueta('B', 'B · marcha corta: gasta mucho<br><small data-vivo="B"></small>', 'deuda'); },
      suben: e => { e.etiqueta('cima', null); e.etiqueta('A', 'A salta marchas: pocos cambios<br><small data-vivo="A" data-cambios="1"></small>', 'ok'); e.etiqueta('B', 'B cambia de a una: pierde más velocidad<br><small data-vivo="B" data-cambios="1"></small>', 'deuda'); },
      llegaA: e => e.etiqueta('cima', 'A llegó antes: menos cambios, perdió menos velocidad', 'ok')
    }
  },
  {
    tipo: 'consumo', titulo: 'La inercia y la anticipación',
    texto: [
      "<b>Inercia:</b> las ganas que tiene el camión de seguir andando solo. Como una pelota que sigue rodando aunque dejes de empujarla. Depende de su <b>peso y su velocidad</b>: cuanto más pesada la carga, más inercia. El freno te la saca.",
      "<b>Mirá el semáforo en rojo:</b><br>• <b>A</b> suelta el acelerador <b>con tiempo</b> y deja rodar el camión con la marcha puesta. Mirá la cabina: <b>gasta CERO</b>.<br>• <b>B</b> sigue acelerando hasta el final y después frena fuerte: gastó gasoil y gastó frenos.",
      "<b>Gastar cero:</b> en los motores de hoy, si vas a más de 20 km/h, <b>soltás el acelerador, no pisás el embrague y tenés una marcha puesta</b>, el motor <b>no gasta nada</b>. Pero si vas en <b>punto muerto</b>, el motor queda en marcha sin hacer nada y <b>sí gasta</b>.",
      "<b>Freno motor:</b> cuando soltás el acelerador con una marcha puesta, el motor frena al camión sin gastar gasoil. Frena más si ponés una marcha más corta: <b>cuanto más corta, más frena</b>. No hay que acelerar.",
      "<b>Para aprovechar la inercia:</b> marcha larga, pocos cambios, saltar marchas, <b>soltar el acelerador con tiempo</b>, acelerar solo cuando haga falta, <b>velocidad pareja</b> y <b>más distancia con el de adelante</b> (así soltás en vez de frenar). En las bajadas, aprovechala. Usarla <b>ahorra gasoil y frenos</b>: es falso que gaste más los frenos.",
      "<b>Anticiparse = mirar lejos</b> para ver venir las cosas. Si un auto varios puestos adelante frena, <b>soltá el acelerador</b>. Llegando a una rotonda o a un semáforo en rojo, soltá antes. Frenar de a poco te deja rodar más metros sin gastar.",
      "<b>Evitá:</b> acelerones, frenazos y acelerar todo el tiempo. No frenes apenas soltás el acelerador.",
      "<b>En la ciudad y en los atascos</b> (arrancás y parás todo el tiempo): mirá lejos, preparate para acelerar y frenar, no bajes de marcha a cada rato, y acelerá y frená un poco menos que el de adelante.",
      "<b>La conducción preventiva</b> sirve para anticiparse a los peligros. Y manejar ahorrando <b>también es más seguro</b>."
    ],
    sim: 'inercia', vista: 'perspectiva',
    alEstado: {
      andan: e => e.etiqueta('semaforo', null),
      ruedaA: e => e.etiqueta('A', 'Soltó con tiempo: rueda gastando CERO', 'ok'),
      frenaB: e => e.etiqueta('B', 'Aceleró hasta el final y frena fuerte', 'deuda'),
      fin: e => e.etiqueta('semaforo', 'A gastó menos: soltó antes y rodó sin gastar', 'globo')
    }
  },
  {
    tipo: 'consumo', titulo: 'El ralentí y el arranque',
    texto: [
      "<b>Ralentí:</b> el motor prendido con el camión parado, sin acelerar. Un camión así gasta <b>alrededor de 1,5 litros por hora</b>. Mirá la cabina.",
      "<b>Parado con el motor prendido, nunca ahorrás.</b> Evitá estar parado así.",
      "<b>¿Cuándo apagar el motor?</b> En las paradas <b>largas</b>, de más de <b>dos minutos</b> (en un examen pusieron \"más de un minuto\"). Apagarlo en paradas cortas está mal.",
      "<b>Si el ralentí está muy alto</b> (el motor parado gira muy acelerado), <b>gasta más</b>.",
      "<b>Al arrancar el motor: no pises el acelerador.</b> No hace falta, gasta de más y el motor todavía no tiene aceite en las piezas.",
      "<b>Diésel frío:</b> dejalo <b>unos segundos prendido, sin acelerar</b>, para que el aceite llegue a todas las piezas. Con el motor frío las piezas están casi secas, por eso se gastan mucho. Dar acelerones en frío gasta y puede romper los cilindros. Los primeros kilómetros, manejá muy suave.",
      "<b>Diésel:</b> esperá unos segundos antes de salir. <b>Gasolina:</b> salí enseguida.",
      "<b>Al salir con el camión:</b> poné una marcha que te deje <b>arrancar suave, casi sin acelerar</b>."
    ],
    sim: 'ralenti', vista: 'perspectiva',
    alEstado: { ralenti: e => e.etiqueta('A', 'Parado al ralentí: 1,5 litros por hora', 'deuda') }
  },
  {
    tipo: 'consumo', titulo: 'La velocidad y el aire',
    texto: [
      "<b>Más velocidad, más gasto</b>, y el gasto sube <b>más rápido que la velocidad</b>. Si pasás de 40 a 80 km/h, el gasto <b>más que se duplica</b>.",
      "<b>¿Por qué?</b> Por el aire. Es como sacar la mano por la ventanilla: cuanto más rápido, más fuerte te empuja. El camión tiene que <b>apartar más aire</b>, y el hueco que deja atrás se tiene que llenar más rápido. Desde <b>60 o 70 km/h</b>, lo que más frena es el aire. El aire produce dos cosas: <b>te frena</b> y hace <b>remolinos</b> (turbulencias).",
      "<b>Lo que más ahorra: ir más despacio</b> (bajar la velocidad media). Gastás menos, contaminás menos, hacés menos ruido, se gastan menos las piezas, vas más cómodo y más seguro. En una empresa con muchos camiones, el ahorro es enorme.",
      "<b>El \"Cx\"</b> (coeficiente aerodinámico) mide <b>qué tan mal corta el aire</b> el camión. <b>Cuanto más bajo, menos gasta y más estable va.</b><br>• Los <b>deflectores</b> (las aletas del techo de la cabina), bien puestos, bajan el gasto <b>alrededor de un 6%</b>.<br>• <b>Ventanillas subidas:</b> abiertas, el aire frena más.<br>• La caja de carga abierta, la baca (portaequipaje del techo) y los cambios que empeoran la forma hacen gastar más.",
      "<b>Viento en contra:</b> a 18 km/h sube el gasto un <b>8%</b>; a 36 km/h, un <b>18%</b>.",
      "<b>El frío:</b> el aire frío es más \"pesado\" y frena más. Si baja <b>10 grados</b>, el gasto sube <b>un 4%</b>."
    ],
    sim: 'aire', vista: 'perspectiva',
    alEstado: { andan: e => { e.etiqueta('A', 'A 70 km/h: gasta menos', 'ok'); e.etiqueta('B', 'A 90 km/h: el aire frena mucho más', 'deuda'); } }
  },
  {
    tipo: 'consumo', titulo: 'Los errores que hacen gastar (y son peligrosos)',
    texto: [
      "El examen pregunta mucho <b>cuál es la forma equivocada de ahorrar</b>. Estas están mal:",
      "• <b>Bajar las cuestas en punto muerto:</b> no ahorra y es peligroso, porque el motor no te ayuda a frenar. Llegar a un semáforo en punto muerto, tampoco.<br>• <b>Bajar con el motor apagado:</b> peligroso.<br>• <b>Apagar el motor en paradas cortas.</b><br>• <b>Andar con el motor muy acelerado.</b><br>• <b>No gastar plata en mantenimiento.</b><br>• <b>Ruedas con menos aire</b> (o con más) del que dice el fabricante. Inflarlas bien ahorra. Las ruedas mal alineadas también hacen gastar más.<br>• <b>Usar gasolina de menos octanaje</b> del que pide el fabricante.<br>• <b>Usar marchas cortas</b> para tener más fuerza cuando no hace falta.",
      "<b>Trampa:</b> un resorte del acelerador roto <b>no</b> hace gastar más. Es un invento del examen."
    ],
    sim: 'quieto', vista: 'perspectiva'
  },
  {
    tipo: 'consumo', titulo: 'Repaso: gastar menos',
    texto: [
      "<b>Lo que frena al camión:</b> el aire, el roce de las ruedas, la cuesta y la inercia.",
      "<b>Marchas:</b> la más alta posible, aguja en verde, primera lo mínimo, bajar de marcha lo más tarde posible. En las subidas, pocos cambios.",
      "<b>Inercia:</b> soltar con tiempo. Con marcha puesta y sin embrague, gastás cero. En punto muerto sí gastás.",
      "<b>Ralentí:</b> 1,5 litros por hora. Apagar en paradas largas. Arrancar sin acelerar.",
      "<b>Velocidad:</b> el gasto sube más rápido que la velocidad. Lo que más ahorra: ir más despacio. Cx bajo, deflectores, ventanillas subidas."
    ],
    sim: 'quieto', vista: 'perspectiva'
  },
  preguntas('consumo', 'Preguntas oficiales: gastar menos')
];

// ---------------- CAPÍTULO 6: ACEITE, REFRIGERACIÓN Y BATERÍA ----------------
export const PASOS_MEC_MANTENIMIENTO = [
  {
    tipo: 'mantenimiento', titulo: 'El aceite (lubricación)',
    texto: [
      "<b>¿Para qué el aceite?</b> Para que las piezas de metal <b>no se rocen en seco</b> y se gasten lo menos posible (como ponerle aceite a una bisagra). Además <b>ayuda a enfriar</b> el motor. El sistema del aceite se llama <b>lubricación</b>, y es el que <b>más cuidado pide</b> (junto con el del agua y el del gasoil).",
      "<b>El viaje del aceite</b> (mirá la animación):<br>1. Está guardado abajo, en el <b>cárter</b>.<br>2. La <b>bomba de aceite</b> (que está adentro del cárter) lo saca y lo manda <b>con fuerza</b> (con presión) a las piezas.<br>3. Pasa por el <b>filtro de aceite</b>, que le saca la mugre (si no, el aceite sucio raspa como una lija). El filtro se cambia porque <b>se tapa</b>, y si está mal, gasta más.<br>4. El aceite se enfría con las <b>aletas del cárter</b> (sacarle el barro ayuda) y en algunos camiones con un <b>radiador de aceite</b>. Se enfría para que no se ponga aguado.",
      "<b>La presión del aceite:</b> tenés que saber si el aceite llega con fuerza. Lo marca un reloj (el <b>manómetro</b>). Una pieza llamada <b>manocontacto</b> prende una luz en el tablero cuando la presión está <b>más baja de lo normal</b>. Con el motor apagado y el contacto puesto, esa luz prendida avisa que no hay presión (es normal porque el motor no gira). Poca presión puede ser por aceite muy caliente; mucha presión, por aceite muy espeso por el frío. El termostato y el termocontacto <b>no</b> son del aceite (son del agua).",
      "<b>Viscosidad = qué tan espeso es el aceite</b> (cuánto le cuesta pasar por los caños). Tiene que estar en la etiqueta. En un aceite <b>15W40</b>: el primer número es para el <b>invierno</b> (la W viene de \"winter\", invierno en inglés) y el segundo para el <b>verano</b>. El <b>0W30</b> es el más fino y aguanta más frío; el <b>10W50</b> aguanta más calor. Uno espeso va mejor con calor; uno muy fino no protege bien. <b>Multigrado</b> = sirve todo el año.",
      "<b>Calidad:</b> un aceite bueno <b>hace que las piezas rocen menos y se gaste menos gasoil</b>; uno malo, al revés. Cambiar aceite, filtros y bujías influye en el gasto. El aceite <b>mineral</b> dura menos y se cambia más seguido que el <b>sintético</b>.",
      "<b>Cambiar el aceite:</b> cuando dice el fabricante (más seguido si andás mucho por ciudad, porque ahí el aceite se enfría menos). Con el motor <b>parado y caliente</b> (el aceite está más líquido y sale toda la mugre) y el camión derecho, sacando el tapón del cárter. <b>No lo tires</b> por la alcantarilla ni lo quemes. Para rellenar: uno con <b>las mismas características</b> (no hace falta la misma marca), por el tapón de la tapa de balancines.",
      "<b>El nivel:</b><br>• <b>Por debajo del mínimo:</b> el motor queda mal engrasado y se puede <b>gripar</b> (trabarse, romperse).<br>• <b>Por encima del máximo:</b> el motor <b>quema aceite de más</b>.<br>Es normal que un motor sano queme un poquito. Quema más yendo muy rápido y con marchas cortas y muchas vueltas. Con <b>pocas vueltas</b> el aceite trabaja mejor.",
      "<b>Señales de problema:</b> gotitas de agua en la varilla = culata o junta de culata rota. Si el motor no se enfría bien, el aceite deja de engrasar bien.",
      "<b>Caja de cambios y diferencial:</b> llevan un aceite <b>muy espeso</b> (valvulina). Si están sellados, no se cambia salvo que se rompan."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'lubricacion', titulo: 'La lubricación', texto: 'La bomba saca el aceite del cárter, pasa por el filtro y llega con presión a las piezas.' }
  },
  {
    tipo: 'mantenimiento', titulo: 'La refrigeración',
    texto: [
      "<b>¿Para qué?</b> Para que el motor <b>no se recaliente</b>: le saca parte del calor. Si no enfría bien, las piezas se agrandan con el calor (se dilatan) y el aceite deja de engrasar bien.",
      "<b>Las piezas</b> (mirá la animación):<br>• <b>Radiador:</b> el panal de adelante, donde el aire enfría el líquido. Hay que limpiarlo por fuera.<br>• <b>Bomba de agua:</b> hace que el líquido <b>dé vueltas</b> entre el radiador y el motor. La mueve <b>una correa</b> desde el cigüeñal: hay que revisar que esté bien tensada.<br>• <b>Ventilador eléctrico (electroventilador):</b> sopla el radiador cuando el camión está parado con el motor caliente. Se prende solo cuando el líquido llega a cierta temperatura (lo avisa un termocontacto en la parte de abajo del radiador).<br>• <b>Manguitos:</b> los caños de goma entre el radiador y el motor.<br>• <b>Termostato:</b> una \"canilla\" a la salida del motor, hacia el radiador. Con el motor <b>frío está cerrada</b>: el líquido no va al radiador, así el motor <b>se calienta rápido</b>. Cuando se calienta, se abre.",
      "<b>Si el termostato se traba abierto:</b> el motor nunca llega a su temperatura y <b>gasta más</b>. La temperatura del motor y que la refrigeración funcione bien influyen en el gasto.",
      "<b>El líquido:</b> es <b>agua destilada con anticongelante</b>. Tiene que congelarse a menos temperatura que el frío que hace donde andás. El agua sola se congela, hierve y oxida (enfriar, enfría bien). La cantidad de anticongelante no cambia el gasto.",
      "<b>Mirar el nivel:</b> en el <b>vaso de expansión</b> (el bidoncito), <b>entre el máximo y el mínimo</b>, con el <b>motor frío</b>. Con el motor caliente el nivel sube. El bidoncito sirve para que no se pierda líquido. Hay que vigilarlo aunque el motor no se caliente de más, porque se va evaporando de a poco. En el tablero, un reloj marca la temperatura del líquido. Se cambia cuando dice el fabricante."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'refrigeracion', titulo: 'La refrigeración', texto: 'Frío: el termostato no deja ir el líquido al radiador. Caliente: se abre.' }
  },
  {
    tipo: 'mantenimiento', titulo: 'La batería y la electricidad',
    texto: [
      "<b>¿Quién hace la electricidad?</b> El <b>alternador</b>, una especie de dínamo que mueve el motor. <b>¿Quién la guarda?</b> La <b>batería</b>, como una pila grande. Mirá la animación:<br>• <b>Al arrancar:</b> la batería mueve el <b>motor de arranque</b>, que tiene una ruedita con dientes (piñón) que engancha en la <b>corona dentada del volante de inercia</b> y hace girar el motor.<br>• <b>Andando:</b> el alternador vuelve a cargar la batería.",
      "<b>Si la luz de carga sigue prendida andando:</b> el alternador <b>no está cargando bien</b>.",
      "<b>Cuidados de la batería:</b><br>• <b>Con mantenimiento</b> (tiene tapones): bornes limpios, mirar el nivel del líquido (tiene que <b>tapar las placas de plomo</b>), rellenar <b>solo con agua destilada</b> y tener limpios los agujeritos de los tapones (dejan salir los gases).<br>• <b>Sin mantenimiento:</b> no tiene tapones; solo bornes limpios.<br>• La mugre, el óxido y la humedad hacen que <b>se descargue sola</b>. Los bornes, bien apretados.",
      "<b>Conectar y desconectar</b> (el negativo, el \"–\", va a masa, o sea a la carrocería):<br>• Para <b>sacarla</b>: el último cable que sacás es el <b>positivo</b>.<br>• Para <b>ponerla</b>: primero el positivo, y el último el <b>negativo</b>.<br>• Para <b>cargarla</b>: desconectá primero el <b>negativo</b>.<br>• Para <b>arrancar con otra batería</b>: positivo con positivo y negativo con negativo.",
      "<b>Dos baterías juntas:</b><br>• <b>En serie se suman los voltios:</b> dos de 12 V dan 24 V.<br>• <b>En paralelo se suma la capacidad:</b> dos de 12 V y 60 Ah dan 12 V y 120 Ah.",
      "<b>Capacidad (Ah, amperios hora):</b> cuánta electricidad guarda. 80 Ah = <b>20 amperios durante 4 horas</b> (20 × 4 = 80). Con frío, la batería rinde menos.",
      "<b>Fusibles:</b> si ponés uno más fuerte del que corresponde, se puede <b>recalentar y prender fuego</b>.",
      "<b>Autos eléctricos:</b> usan baterías de <b>plomo, níquel y litio</b>. La de <b>litio</b> es la mejor: pesa menos, dura más, rinde más, no necesita mantenimiento y se puede cargar de a poco."
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'electricidad', titulo: 'La batería y el alternador', texto: 'La batería arranca el motor; andando, el alternador la vuelve a cargar.' }
  },
  {
    tipo: 'mantenimiento', titulo: 'Revisar antes de salir',
    texto: [
      "<b>Antes de prender el motor</b> (motor <b>apagado y frío</b>, camión <b>en llano</b>):<br>• <b>El aceite</b> con la varilla (mirá la animación). En frío todo el aceite bajó al cárter; en caliente, parte sigue arriba y la medida sale mal. En una cuesta también sale mal. Tiene que quedar entre el mínimo y el máximo.<br>• <b>Si pierde líquidos:</b> mirá debajo del camión.<br>• El líquido del embrague hidráulico.",
      "<b>Con el motor prendido:</b> la <b>presión del aceite</b> en el reloj (antes de arrancar no se puede ver).",
      "<b>Cuidado:</b> no abras el motor prendido con ropa suelta o joyas: se pueden enganchar en el ventilador o en las correas.",
      "El mantenimiento es para ir seguro y gastar menos. <b>No es para ir más rápido.</b>"
    ],
    sim: 'quieto', vista: 'perspectiva',
    figura: { anim: 'varilla', titulo: 'Antes de salir', texto: 'Aceite con la varilla: motor frío y camión en llano. Tiene que quedar entre el mínimo y el máximo.' }
  },
  {
    tipo: 'mantenimiento', titulo: 'Repaso: aceite, refrigeración y batería',
    texto: [
      "<b>Aceite:</b> engrasa y enfría. Bomba en el cárter, filtro, reloj de presión. Viscosidad: 15W40 (invierno/verano). Se cambia en caliente; se mide en frío y en llano. Debajo del mínimo: se gripa. Arriba del máximo: quema aceite.",
      "<b>Refrigeración:</b> radiador, bomba de agua con correa, ventilador, termostato (si se traba abierto, gasta más). Agua destilada + anticongelante. Nivel en el bidoncito, en frío.",
      "<b>Batería:</b> guarda lo que hace el alternador. En serie suma voltios; en paralelo suma amperios hora. 80 Ah = 20 A durante 4 h. Litio: la mejor de los eléctricos."
    ],
    sim: 'quieto', vista: 'perspectiva'
  },
  preguntas('mantenimiento', 'Preguntas oficiales: aceite, refrigeración y batería')
];

// ---------------- CAPÍTULO 7: ESCAPE Y CONTAMINACIÓN ----------------
export const PASOS_MEC_CONTAMINACION = [
  {
    tipo: 'contaminacion', titulo: 'El escape y el color del humo',
    texto: [
      "<b>El escape</b> es el caño que <b>saca el humo</b> del motor. Además:<br>• <b>baja el ruido</b>, con el <b>silencioso</b>;<br>• <b>limpia el humo</b>, con el <b>catalizador</b>.",
      "<b>El catalizador</b> (mirá el dibujo) es como un panal por donde pasa el humo: hace que los gases malos <b>salgan menos dañinos</b>. Baja la contaminación.",
      "<b>¿Qué sale por el escape?</b> Entre otros gases, <b>monóxido de carbono</b>. El transporte por carretera es el que más monóxido de carbono larga, y en mercancías la ruta es la que más <b>dióxido de carbono (CO₂)</b> larga. El que menos CO₂ larga por tonelada y kilómetro es <b>el tren</b>.",
      "<b>El color del humo te avisa qué le pasa al motor:</b><br>• <b>Negro:</b> no se quema todo el gasoil. Por ejemplo, por el filtro de aire sucio. Mirá el camión gris.<br>• <b>Blanco azulado:</b> el motor está quemando aceite, porque los aritos del pistón (segmentos) están gastados y entra aceite donde se quema el gasoil.<br>• <b>Gotitas de agua al arrancar en frío:</b> no es avería: es el vapor del humo que se enfría.",
      "Sale menos humo con el motor <b>a medias vueltas</b>.",
      "<b>El biodiésel</b> contamina menos y se disuelve mejor en el agua, así que la naturaleza lo deshace más fácil."
    ],
    sim: 'humo', vista: 'costado',
    figura: { img: 'filtro-particulas', titulo: 'Por dentro del escape', texto: 'Un panal por donde pasan los gases para que salgan menos dañinos.' },
    alEstado: { andan: e => { e.etiqueta('A', 'Motor sano: casi no echa humo', 'ok'); e.etiqueta('B', 'Humo negro: no quema todo', 'deuda'); } }
  },
  {
    tipo: 'contaminacion', titulo: 'Manejar eficiente cuida el ambiente',
    texto: [
      "<b>Si gastás menos gasoil, quemás menos y contaminás menos.</b> Manejar ahorrando larga menos CO₂.",
      "<b>Ventajas de manejar ahorrando</b> (con la marcha más alta posible y yendo más despacio):<br>• gastás menos;<br>• hay menos <b>humo</b> y menos <b>ruido</b>;<br>• se gastan menos las piezas y el motor dura más; hasta podés <b>espaciar más las revisiones</b>;<br>• vas más cómodo y <b>más seguro</b>;<br>• <b>el país gasta menos en energía</b>.",
      "<b>Conducción eficiente:</b> la que gasta menos gasoil y contamina menos. No es para llegar antes.",
      "<b>Lo que el transporte le cuesta al ambiente:</b> la energía que gasta, los gases que larga y el ruido.",
      "<b>Organizar bien los camiones de una empresa</b> ahorra energía y contamina menos. Los <b>peajes</b> de camiones se cobran según su <b>categoría EURO</b> (cuánto contaminan)."
    ],
    sim: 'marchas', vista: 'perspectiva',
    alEstado: { andan: e => { e.etiqueta('A', 'Marcha larga: menos gasto, humo y ruido', 'ok'); e.etiqueta('B', 'Marcha corta: más gasto, humo y ruido', 'deuda'); } }
  },
  {
    tipo: 'contaminacion', titulo: 'Repaso: escape y contaminación',
    texto: [
      "<b>Escape:</b> saca el humo, baja el ruido (silencioso) y limpia los gases (catalizador).",
      "<b>Color del humo:</b> negro = no quema todo (filtro de aire sucio). Blanco azulado = quema aceite (segmentos gastados). Gotitas en frío = normal.",
      "<b>Gastar menos = contaminar menos</b>, menos ruido, menos desgaste, más seguridad. El tren es el que menos CO₂ larga."
    ],
    sim: 'quieto', vista: 'perspectiva'
  },
  preguntas('contaminacion', 'Preguntas oficiales: escape y contaminación')
];
