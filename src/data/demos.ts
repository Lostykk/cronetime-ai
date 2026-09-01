export interface MensajeDemo {
  de: "cliente" | "agente";
  texto: string;
}

export interface AccionDemo {
  tipo: string;
  titulo: string;
  detalle: string;
}

export interface EscenaDemo {
  mensajes: MensajeDemo[];
  accion: AccionDemo;
}

export const DEMOS: Record<string, Record<string, EscenaDemo>> = {
  sofia: {
    Reserva: {
      mensajes: [
        { de: "cliente", texto: "Hola! Tenés mesa para 4 el viernes a las 21?" },
        { de: "agente", texto: "Hola! Sí, tengo disponible 🌿 ¿A nombre de quién la hago?" },
        { de: "cliente", texto: "Martín Suárez" },
        { de: "agente", texto: "Listo Martín, mesa para 4 el viernes a las 21hs. ¿Querés que reserve la vereda o adentro?" },
        { de: "cliente", texto: "Adentro mejor" },
        { de: "agente", texto: "Perfecto, quedó confirmada. Te esperamos!" },
      ],
      accion: { tipo: "RESERVA", titulo: "Martín Suárez", detalle: "4 personas · Viernes 21:00 · Salón interior" },
    },
    Pedido: {
      mensajes: [
        { de: "cliente", texto: "Hola, quiero pedir 2 milanesas napolitanas para llevar" },
        { de: "agente", texto: "Dale! 2 milanesas napolitanas te salen $29.800 en total. ¿Sumamos algo de postre o bebida?" },
        { de: "cliente", texto: "Una copa de vino tinto" },
        { de: "agente", texto: "Sumada 🍷 Quedan $34.600 en total. ¿Retirás vos o lo mandamos por delivery?" },
        { de: "cliente", texto: "Paso a buscarlo" },
        { de: "agente", texto: "Perfecto, en 25 minutos lo tenés listo para retirar." },
      ],
      accion: { tipo: "PEDIDO", titulo: "2 milanesas + copa de vino", detalle: "$34.600 · Retira en 25 min" },
    },
    Queja: {
      mensajes: [
        { de: "cliente", texto: "La comida llegó fría y encima el mozo nos ignoró toda la noche" },
        { de: "agente", texto: "Uy, lamento muchísimo lo que pasó 🙏 Ya se lo estoy pasando al encargado para que te contacte." },
        { de: "cliente", texto: "Espero que hagan algo, la pasamos mal" },
        { de: "agente", texto: "Totalmente entendible. El encargado te escribe en un rato para resolverlo, no vas a quedar así." },
      ],
      accion: { tipo: "QUEJA ESCALADA", titulo: "Comida fría + mala atención", detalle: "Encargado avisado al instante" },
    },
  },

  marcos: {
    Consulta: {
      mensajes: [
        { de: "cliente", texto: "Hola, buscan departamentos de 2 ambientes en Palermo?" },
        { de: "agente", texto: "Hola! Sí, tenemos 4 unidades disponibles en la zona. ¿Es para alquilar o comprar?" },
        { de: "cliente", texto: "Para alquilar" },
        { de: "agente", texto: "Perfecto. Los alquileres en Palermo van de $450.000 a $680.000 según metros y amenities. ¿Tenés un presupuesto en mente?" },
        { de: "cliente", texto: "Hasta 550 mil" },
        { de: "agente", texto: "Tengo 2 unidades que entran justo. ¿Querés que agende una visita esta semana?" },
      ],
      accion: { tipo: "LEAD CALIFICADO", titulo: "Alquiler 2 amb Palermo", detalle: "Presupuesto hasta $550.000 · Listo para visitar" },
    },
  },

  maria: {
    Turno: {
      mensajes: [
        { de: "cliente", texto: "Buenas, cuánto sale una limpieza dental?" },
        { de: "agente", texto: "Hola! La limpieza dental completa sale $28.000 e incluye pulido y flúor. ¿Querés agendar?" },
        { de: "cliente", texto: "Sí, tienen algo esta semana?" },
        { de: "agente", texto: "Tengo el jueves 10:30 o el viernes 16:00. ¿Cuál te queda mejor?" },
        { de: "cliente", texto: "El jueves. Soy Lucía Fernández" },
        { de: "agente", texto: "Listo Lucía, jueves 10:30. Vení 10 minutos antes con tu DNI." },
      ],
      accion: { tipo: "TURNO", titulo: "Lucía Fernández", detalle: "Limpieza dental · Jueves 10:30 · $28.000" },
    },
  },

  pia: {
    Tratamiento: {
      mensajes: [
        { de: "cliente", texto: "Hola! Hacen depilación definitiva?" },
        { de: "agente", texto: "Hola! Sí, trabajamos con láser de diodo ✨ La sesión de piernas completas sale $45.000." },
        { de: "cliente", texto: "Cuántas sesiones necesito?" },
        { de: "agente", texto: "En general entre 6 y 8. Tenemos un paquete de 6 sesiones a $230.000, ahorrás casi $40.000." },
        { de: "cliente", texto: "Me interesa! Puedo el sábado?" },
        { de: "agente", texto: "Tengo sábado a las 11. ¿Me pasás tu nombre para agendarte?" },
      ],
      accion: { tipo: "TURNO + PAQUETE", titulo: "Depilación láser", detalle: "Paquete 6 sesiones · $230.000 · Sábado 11:00" },
    },
  },

  emanuel: {
    Consulta: {
      mensajes: [
        { de: "cliente", texto: "Buenas tardes, qué opciones tienen para invertir a plazo fijo?" },
        { de: "agente", texto: "Buenas tardes. Trabajamos con plazos fijos tradicionales y fondos comunes de inversión. ¿Qué plazo tenés pensado?" },
        { de: "cliente", texto: "Un año más o menos" },
        { de: "agente", texto: "Para ese plazo hay opciones en pesos y en dólares con distintos perfiles de riesgo. ¿Querés que agende una llamada con un asesor para ver cuál se ajusta mejor?" },
        { de: "cliente", texto: "Dale, mañana a la tarde" },
        { de: "agente", texto: "Perfecto. ¿Me pasás tu nombre y un rango aproximado de inversión para que el asesor prepare las opciones?" },
      ],
      accion: { tipo: "REUNIÓN AGENDADA", titulo: "Consulta de inversión", detalle: "Plazo 12 meses · Asesor asignado · Mañana 16:00" },
    },
  },

  javier: {
    Cotización: {
      mensajes: [
        { de: "cliente", texto: "Hola! Cuánto sale un paquete a Cancún para 2 personas?" },
        { de: "agente", texto: "Hola! Tenemos salidas en octubre desde $1.850.000 por persona, 7 noches all inclusive con aéreos ✈️" },
        { de: "cliente", texto: "Incluye traslados?" },
        { de: "agente", texto: "Sí, traslados in/out y asistencia al viajero incluidos. Quedan 6 lugares en la salida del 12 de octubre." },
        { de: "cliente", texto: "Me interesa, cómo sigo?" },
        { de: "agente", texto: "Te agendo con un asesor para armar el presupuesto final. ¿Tu nombre y un horario que te venga bien?" },
      ],
      accion: { tipo: "LEAD DE ALTO VALOR", titulo: "Paquete Cancún x2", detalle: "Salida 12 oct · $3.700.000 estimado · Asesor asignado" },
    },
  },
};
