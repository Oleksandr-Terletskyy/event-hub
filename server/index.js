const http = require('http');
const url = require('url');

const parseQueryParameters = (request) => url.parse(request.url, true).query;

const handleRequest = (method, request, response, callback) => {
  if (request.method !== method) return throwBadRequest(response);

  callback(request, response);
};

const throwUnauthorized = (response) => {
  response.writeHead(403);
  response.end('Invalid credentials');
};

const throwBadRequest = (response) => {
  response.writeHead(400);
  response.end('Bad request');
};

const jsonResponse = (response, data) => {
  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify(data));
};

const handleAccountsRequest = (request, response) => {
  jsonResponse(response, {
    accounts: [
      {
        "sessionKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE2MjM5MDIyfQ.gzxyYmzn56YpGQ7Y_c1eCbUQDdIKc2AxKCQjwYyJxV0",
        "name": "John Smith",
        "username": "john.smith"
      },
      {
        "sessionKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTE2MjM5MDIzfQ.VUuXeMIza1I51Yb1Zjuok6uCxA7grA7QKAGrszpA7IQ",
        "name": "Bob Green",
        "username": "bob.green"
      },
      {
        "sessionKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTE2MjM5MDI0fQ.RPxIHnLBlm2YP-aMX1oUTU8PTUsEcjZGkT2hgpJWKrg",
        "name": "Tom Blair",
        "username": "tom.blair"
      }
    ],
    total: 3
  });
};

const handleSignInRequest = (request, response) => {
  const validKeys = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE2MjM5MDIyfQ.gzxyYmzn56YpGQ7Y_c1eCbUQDdIKc2AxKCQjwYyJxV0',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTE2MjM5MDIzfQ.VUuXeMIza1I51Yb1Zjuok6uCxA7grA7QKAGrszpA7IQ',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTE2MjM5MDI0fQ.RPxIHnLBlm2YP-aMX1oUTU8PTUsEcjZGkT2hgpJWKrg'
  ];
  const queryParameters = parseQueryParameters(request);

  if (!validKeys.includes(queryParameters.key)) return throwUnauthorized(response);

  const responseData = {
    [validKeys[0]]: {
      "id": 1,
      "name": "John Smith",
      "username": "john.smith"
    },
    [validKeys[1]]: {
      "id": 2,
      "name": "Bob Green",
      "username": "bob.green"
    },
    [validKeys[2]]: {
      "id": 3,
      "name": "Tom Blair",
      "username": "tom.blair"
    },
  };

  jsonResponse(response, responseData[queryParameters.key]);
};

const handleEventsRequest = (request, response) => {
  const queryParameters = parseQueryParameters(request);
  const invalidParameters = !(queryParameters.offset && queryParameters.limit);

  if (invalidParameters) return throwBadRequest(response);

  const responseData = {
    0: [
      {
        "id": 1,
        "name": "Techspo London",
        "image": "https://www.2checkout.com/docs/en/events/techspo-londond-22-event-page.png",
        "previewText": "We're happy to let you know that we will be exhibiting at Techspo London. Come by our booth!",
        "place": "London, GB",
        "dates": [
          1665352800000
        ]
      },
      {
        "id": 2,
        "name": "CommerceNow",
        "image": "https://www.2checkout.com/docs/en/events/CommerceNow2022.png",
        "previewText": "It's time to elevate the way you sell online at CommerceNow, the premier global event focused on Digital Commerce!",
        "place": "Online",
        "dates": [
          1665612000000,
          1665698400000,
          1665784800000
        ]
      },
      {
        "id": 3,
        "name": "TNW Conference",
        "image": "https://www.2checkout.com/docs/en/events/the-next-web-2022.png",
        "previewText": "Join us at The Next Web Conference this summer, Europe's leading tech festival. Let's meet up!",
        "place": "Amsterdam, NL",
        "dates": [
          1665871200000,
          1665957600000,
          1666044000000
        ]
      },
      {
        "id": 4,
        "name": "SaaStr Europa 2022",
        "image": "https://www.2checkout.com/docs/en/events/saastr-europa-2022-square.png",
        "previewText": "So thrilled to be attending SaaStr Europa, the place where the SaaS community joins together to share, scale, and grow together!",
        "place": "Barcelona, ES",
        "dates": [
          1666130400000,
          1666216800000,
          1666303200000
        ]
      },
      {
        "id": 5,
        "name": "SubSummit 2022",
        "image": "https://www.2checkout.com/docs/en/events/subsummit-event-page.png",
        "previewText": "We are a proud sponsor of SubSummit, the world’s largest DTC subscription conference. Meet us there!",
        "place": "Orlando, US",
        "dates": [
          1666389600000,
          1666476000000
        ]
      },
      {
        "id": 6,
        "name": "The Customer Show",
        "image": "https://www.2checkout.com/docs/en/events/the-customer-show-22.png",
        "previewText": "So thrilled to be attending SaaStr Europa, the place where the SaaS community joins together to share, scale, and grow together!",
        "place": "Melbourne, AU",
        "dates": [
          1666735200000,
          1666821600000,
          1666908000000,
          1666994400000
        ]
      },
      {
        "id": 7,
        "name": "BrightonSEO.",
        "image": "https://www.2checkout.com/docs/en/events/BrightonSEO2022.png",
        "previewText": "We will attend BrightonSEO, the place that brings together the best speakers in the world of search. Join us!",
        "place": "Brighton, GB",
        "dates": [
          1667080800000
        ]
      },
      {
        "id": 8,
        "name": "Business of Software Europe",
        "image": "https://www.2checkout.com/docs/en/events/BoS-Europe.png",
        "previewText": "Join us at Business of Software, the conference that brings together the SaaS & Software community!",
        "place": "Cambridge, UK",
        "dates": [
          1667257200000,
          1667343600000
        ]
      },
      {
        "id": 9,
        "name": "SaaStock Remote 2022",
        "image": "https://www.2checkout.com/docs/en/events/saastockremote-2022.png",
        "previewText": "We are attending SaaStock Remote, the global online conference reuniting 2000+ SaaS leaders. Meet us there!",
        "place": "Online",
        "dates": [
          1667602800000,
          1667689200000,
          1667775600000
        ]
      }
    ],
    9: [
      {
        "id": 10,
        "name": "Mobile World Congress Barcelona",
        "image": "https://www.2checkout.com/docs/en/events/Ecommerce-Global-Events-2022.png",
        "previewText": "We are so excited to attend MWC Barcelona, the largest mobile event in the world. Can't wait to meet you there!",
        "place": "Barcelona, ES",
        "dates": [
          1667948400000
        ]
      },
      {
        "id": 11,
        "name": "Ecommerce Tech Summit '21",
        "image": "https://www.2checkout.com/docs/en/events/Ecommerce-Tech-Summit-2021.png",
        "previewText": "We will be speaking at Ecommerce Tech Summit, the online summit for software developers in eCommerce projects. Join us!",
        "place": "Online",
        "dates": [
          1668207600000,
          1668294000000
        ]
      },
      {
        "id": 12,
        "name": "GoTech World",
        "image": "https://www.2checkout.com/docs/en/events/GoTechWorldNov-2021.png",
        "previewText": "So thrilled to be attending SaaStr Europa, the place where the SaaS community joins together to share, scale, and grow together!",
        "place": "Online",
        "dates": [
          1668466800000,
          1668553200000
        ]
      },
      {
        "id": 13,
        "name": "SaaStock EMEA",
        "image": "https://www.2checkout.com/docs/en/events/SaaStockEMEA21.png",
        "previewText": "We are excited to be a Gold Sponsor and speaking at SaaStock EMEA, the biggest growth-focused SaaS conference. Join us!",
        "place": "Online",
        "dates": [
          1668639600000
        ]
      },
      {
        "id": 14,
        "name": "SaaStr Annual 2021",
        "image": "https://www.2checkout.com/docs/en/events/SaaStr-Annual-21.png",
        "previewText": "2Checkout is a proud Golden Sponsor and speaker at SaaStr Annual, the biggest global B2B SaaS Conference. Meet us there!",
        "place": "San Mateo, US",
        "dates": [
          1668726000000,
          1668812400000
        ]
      },
      {
        "id": 15,
        "name": "U Tomorrow Summit",
        "image": "https://www.2checkout.com/docs/en/events/UTomorrow-Summit-Event.png",
        "previewText": "Join us at U Tomorrow Summit, the place to find new opportunities to scale your business and identify global trends!",
        "place": "Kyiv, UA",
        "dates": [
          1668898800000
        ]
      },
      {
        "id": 16,
        "name": "The Future of Ecommerce Global 2021",
        "image": "https://www.2checkout.com/docs/en/events/Ecommerce-Global-Events.png",
        "previewText": "We will be speaking at The Future of Ecommerce Global, the right place to discover new eCommerce trends. Join us!",
        "place": "Online",
        "dates": [
          1668985200000,
          1669071600000
        ]
      },
      {
        "id": 17,
        "name": "CommerceNow",
        "image": "https://www.2checkout.com/docs/en/events/CommerceNow-21.png",
        "previewText": "Transform the way you sell online at CommerceNow, the global virtual event focused on digital commerce.",
        "place": "Online",
        "dates": [
          1669158000000
        ]
      },
      {
        "id": 18,
        "name": "Own Your Growth 2021",
        "image": "https://www.2checkout.com/docs/en/events/saastr-europa-2022-square.png",
        "previewText": "https://www.2checkout.com/docs/en/events/own-your-growth-2021.png",
        "place": "Online",
        "dates": [
          1669244400000,
          1669330800000
        ]
      }
    ],
    18: [
      {
        "id": 19,
        "name": "SaaStock Remote 2021",
        "image": "https://www.2checkout.com/docs/en/events/saastock-remote-2021.png",
        "previewText": "2Checkout is a Gold Partner of SaaStock Remote, the global online conference reuniting 3000+ SaaS professionals. Join us!",
        "place": "Online",
        "dates": [
          1669417200000,
          1669503600000
        ]
      },
      {
        "id": 20,
        "name": "SaaS Tiger",
        "image": "https://www.2checkout.com/docs/en/events/saas-tiger-2020.png",
        "previewText": "2Checkout will sponsor SaaS Tiger, bringing together SaaS sales, marketing & product teams, founders and more. Meet us online!",
        "place": "Online",
        "dates": [
          1669590000000,
          1669676400000
        ]
      },
      {
        "id": 21,
        "name": "SaaStock APAC",
        "image": "https://www.2checkout.com/docs/en/events/saastock-apac-2020.png",
        "previewText": "2Checkout is a Gold Partner of SaaStock APAC, the leading online conference for SaaS founders, execs and investors.",
        "place": "Online",
        "dates": [
          1669762800000
        ]
      },
      {
        "id": 22,
        "name": "Velocity",
        "image": "https://www.2checkout.com/docs/en/events/velocity-2020.png",
        "previewText": "We're excited to be a speaker at Velocity, a virtual event hosted by Verifone. Join us!",
        "place": "Online",
        "dates": [
          1669762800000,
          1669849200000,
          1669849200000
        ]
      },
      {
        "id": 23,
        "name": "Subscription Show 2020",
        "image": "https://www.2checkout.com/docs/en/events/subscription-show-2020.png",
        "previewText": "2Checkout is a Bronze Sponsor of Subscription Show 2020, serving the best subscription intel in the industry. Join us!",
        "place": "Online",
        "dates": [
          1669935600000
        ]
      },
      {
        "id": 24,
        "name": "SaaStock EMEA",
        "image": "https://www.2checkout.com/docs/en/events/saastock-emea-2020.png",
        "previewText": "2Checkout is a Gold Partner of SaaStock EMEA, the most actionable online conference for B2B SaaS. Join us!",
        "place": "Online",
        "dates": [
          1670108400000,
          1670194800000
        ]
      },
      {
        "id": 25,
        "name": "Own Your Growth",
        "image": "https://www.2checkout.com/docs/en/events/own-your-growth-2020.png",
        "previewText": "2Checkout is a proud partner of Predictable Revenue’s Own Your Growth Virtual Summit, the go-to meeting place for top sales",
        "place": "Online",
        "dates": [
          1670367600000
        ]
      },
      {
        "id": 26,
        "name": "SaaStr Annual at Home",
        "image": "https://www.2checkout.com/docs/en/events/saastr-annual-at-home-2020.png",
        "previewText": "2Checkout is a proud Bronze Sponsor of SaaStr Annual at Home, the world's largest community SaaS conference. Join us online!",
        "place": "Online",
        "dates": [
          1670540400000,
          1670626800000
        ]
      },
      {
        "id": 27,
        "name": "Product-Led Summit",
        "image": "https://www.2checkout.com/docs/en/events/product-led-summit-2020-july-online-event.jpg",
        "previewText": "Join us at Product-Led Summit 2020, the online event helping SaaS companies build products that sell themselves.",
        "place": "Online",
        "dates": [
          1670799600000
        ]
      }
    ]
  };

  jsonResponse(response, {
    data: responseData[queryParameters.offset],
    total: 27
  });
};

const handleEventRequest = (request, response) => {
  const eventId = request.url.split('/').at(-1);
  const invalidId = !Number(eventId);

  if (invalidId) return throwBadRequest(response);

  const responseData = {
    1: {
      id: 1,
      description:
        "We're happy to let you know that we will be exhibiting at Techspo London. Come by our booth! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    2: {
      id: 2,
      description:
        "It's time to elevate the way you sell online at CommerceNow, the premier global event focused on Digital Commerce! Number of places is limited, hurry up!",
    },
    3: {
      id: 3,
      description:
        "Join us at The Next Web Conference this summer, Europe's leading tech festival. Let's meet up!",
    },
    4: {
      id: 4,
      description:
        "So thrilled to be attending SaaStr Europa, the place where the SaaS community joins together to share, scale, and grow together! Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
    },
    5: {
      id: 5,
      description:
        "We are a proud sponsor of SubSummit, the world’s largest DTC subscription conference. Meet us there! The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
    },
    6: {
      id: 6,
      description:
        "So thrilled to be attending SaaStr Europa, the place where the SaaS community joins together to share, scale, and grow together!",
    },
    7: {
      id: 7,
      description:
        "We will attend BrightonSEO, the place that brings together the best speakers in the world of search. Join us!",
    },
    8: {
      id: 8,
      description:
        "Join us at Business of Software, the conference that brings together the SaaS & Software community!",
    },
    9: {
      id: 9,
      description:
        "We are attending SaaStock Remote, the global online conference reuniting 2000+ SaaS leaders. Meet us there!",
    },
    10: {
      id: 10,
      description:
        "We are so excited to attend MWC Barcelona, the largest mobile event in the world. Can't wait to meet you there!",
    },
    11: {
      id: 11,
      description:
        "We will be speaking at Ecommerce Tech Summit, the online summit for software developers in eCommerce projects. Join us!",
    },
    12: {
      id: 12,
      description:
        "So thrilled to be attending SaaStr Europa, the place where the SaaS community joins together to share, scale, and grow together!",
    },
    13: {
      id: 13,
      description:
        "We are excited to be a Gold Sponsor and speaking at SaaStock EMEA, the biggest growth-focused SaaS conference. Join us!",
    },
    14: {
      id: 14,
      description:
        "2Checkout is a proud Golden Sponsor and speaker at SaaStr Annual, the biggest global B2B SaaS Conference. Meet us there!",
    },
    15: {
      id: 15,
      description:
        "Join us at U Tomorrow Summit, the place to find new opportunities to scale your business and identify global trends!",
    },
    16: {
      id: 16,
      description:
        "We will be speaking at The Future of Ecommerce Global, the right place to discover new eCommerce trends. Join us!",
    },
    17: {
      id: 17,
      description:
        "Transform the way you sell online at CommerceNow, the global virtual event focused on digital commerce.",
    },
    18: {
      id: 18,
      description:
        "2Checkout is a proud partner of Predictable Revenue’s Own Your Growth Virtual Summit, the go-to meeting place for top sales",
    },
    19: {
      id: 19,
      description:
        "2Checkout is a Gold Partner of SaaStock Remote, the global online conference reuniting 3000+ SaaS professionals. Join us!",
    },
    20: {
      id: 20,
      description:
        "2Checkout will sponsor SaaS Tiger, bringing together SaaS sales, marketing & product teams, founders and more. Meet us online!",
    },
    21: {
      id: 21,
      description:
        "2Checkout is a Gold Partner of SaaStock APAC, the leading online conference for SaaS founders, execs and investors.",
    },
    22: {
      id: 22,
      description:
        "We're excited to be a speaker at Velocity, a virtual event hosted by Verifone. Join us!",
    },
    23: {
      id: 23,
      description:
        "2Checkout is a Bronze Sponsor of Subscription Show 2020, serving the best subscription intel in the industry. Join us!",
    },
    24: {
      id: 24,
      description:
        "2Checkout is a Gold Partner of SaaStock EMEA, the most actionable online conference for B2B SaaS. Join us!",
    },
    25: {
      id: 25,
      description:
        "2Checkout is a proud partner of Predictable Revenue’s Own Your Growth Virtual Summit, the go-to meeting place for top sales",
    },
    26: {
      id: 26,
      description:
        "2Checkout is a proud Bronze Sponsor of SaaStr Annual at Home, the world's largest community SaaS conference. Join us online!",
    },
    27: {
      id: 27,
      description:
        "Join us at Product-Led Summit 2020, the online event helping SaaS companies build products that sell themselves.",
    }
  };


  jsonResponse(response, responseData[eventId]);
};

const handleAttendingStatisticsRequest = (request, response) => {
  const responseData = {
    data: [
      {
        name: "Techspo London",
        attendees: 11,
      },
      {
        name: "CommerceNow",
        attendees: 10,
      },
      {
        name: "TNW Conference",
        attendees: 5,
      },
      {
        name: "SaaStr Europa 2022",
        attendees: 15,
      },
      {
        name: "SubSummit 2022",
        attendees: 0,
      },
      {
        name: "The Customer Show",
        attendees: 1,
      },
      {
        name: "BrightonSEO",
        attendees: 7,
      },
      {
        name: "Business of Software Europe",
        attendees: 9,
      },
      {
        name: "SaaStock Remote 2022",
        attendees: 20,
      },
      {
        name: "Mobile World Congress Barcelona",
        attendees: 13,
      },
      {
        name: "Ecommerce Tech Summit '21",
        attendees: 13,
      },
      {
        name: "GoTech World",
        attendees: 9,
      },
      {
        name: "SaaStock EMEA",
        attendees: 3,
      },
      {
        name: "SaaStr Annual 2021",
        attendees: 2,
      },
      {
        name: "U Tomorrow Summit",
        attendees: 4,
      },
      {
        name: "The Future of Ecommerce Global 2021",
        attendees: 0,
      },
      {
        name: "CommerceNow",
        attendees: 7,
      },
      {
        name: "Own Your Growth 2021",
        attendees: 5,
      },
      {
        name: "SaaStock Remote 2021",
        attendees: 17,
      },
      {
        name: "SaaS Tiger",
        attendees: 6,
      },
      {
        name: "SaaStock APAC",
        attendees: 16,
      },
      {
        name: "Velocity",
        attendees: 11,
      },
      {
        name: "Subscription Show 2020",
        attendees: 1,
      },
      {
        name: "SaaStock EMEA",
        attendees: 18,
      },
      {
        name: "Own Your Growth",
        attendees: 14,
      },
      {
        name: "SaaStr Annual at Home",
        attendees: 7,
      },
      {
        name: "Product-Led Summit",
        attendees: 8,
      },
    ],
  };

  jsonResponse(response, responseData);
};

const handleOptionsRequest = (response) => {
  response.writeHead(200);
  response.end();
};

const setAccessControlHeaders = (response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const requestListener = (request, response) => {
  setAccessControlHeaders(response);

  if (request.method === 'OPTIONS') return handleOptionsRequest(response); // Handle browser's pre-flight OPTIONS request

  if (!request.url.includes('/api/')) return throwBadRequest(response);

  switch (true) {
    case request.url.includes('/accounts'):
      handleRequest('GET', request, response, handleAccountsRequest);
      break;
    case request.url.includes('/sign-in'):
      handleRequest('POST', request, response, handleSignInRequest);
      break;
    case request.url.includes('/events'):
      handleRequest('GET', request, response, handleEventsRequest);
      break;
    case request.url.includes('/event'):
      handleRequest('GET', request, response, handleEventRequest);
      break;
    case request.url.includes('/statistics/attending'):
      handleRequest('GET', request, response, handleAttendingStatisticsRequest);
      break;
    default:
      throwBadRequest(response);
  }
};

const server = http.createServer(requestListener);

server.listen(4300);