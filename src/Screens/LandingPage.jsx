import Card from "../Components/Card";

const liveEvents = [
  {
    id: 1,
    title: "MotoGP Grand Prix 2025",
    location: "Circuit of the Americas",
    currentLap: 15,
    totalLaps: 20,
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
    leaders: [
      {
        position: 1,
        rider: "Marc Márquez",
        gap: "Leader",
        team: "Repsol Honda",
      },
      {
        position: 2,
        rider: "Fabio Quartararo",
        gap: "+2.341",
        team: "Monster Yamaha",
      },
      {
        position: 3,
        rider: "Francesco Bagnaia",
        gap: "+4.167",
        team: "Ducati Lenovo",
      },
    ],
  },
  {
    id: 2,
    title: "MotoGP Grand Prix 2025",
    location: "Circuit of the Americas",
    currentLap: 15,
    totalLaps: 20,
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
    leaders: [
      {
        position: 1,
        rider: "Marc Márquez",
        gap: "Leader",
        team: "Repsol Honda",
      },
      {
        position: 2,
        rider: "Fabio Quartararo",
        gap: "+2.341",
        team: "Monster Yamaha",
      },
      {
        position: 3,
        rider: "Francesco Bagnaia",
        gap: "+4.167",
        team: "Ducati Lenovo",
      },
    ],
  },
  {
    id: 2,
    title: "MotoGP Grand Prix 2025",
    location: "Circuit of the Americas",
    currentLap: 15,
    totalLaps: 20,
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
    leaders: [
      {
        position: 1,
        rider: "Marc Márquez",
        gap: "Leader",
        team: "Repsol Honda",
      },
      {
        position: 2,
        rider: "Fabio Quartararo",
        gap: "+2.341",
        team: "Monster Yamaha",
      },
      {
        position: 3,
        rider: "Francesco Bagnaia",
        gap: "+4.167",
        team: "Ducati Lenovo",
      },
    ],
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Superbike Championship",
    date: "March 25, 2025",
    location: "Silverstone Circuit",
    image:
      "https://images.unsplash.com/photo-1547025603-ef800f02690e?q=80&w=2700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Join us for the most anticipated Superbike Championship of the year.",
    registrationFee: "$150",
    totalSpots: 100,
    spotsLeft: 45,
    features: ["Professional Track", "Live Broadcasting", "VIP Hospitality"],
  },
  {
    id: 2,
    title: "Superbike Championship",
    date: "March 25, 2025",
    location: "Silverstone Circuit",
    image:
      "https://images.unsplash.com/photo-1547025603-ef800f02690e?q=80&w=2700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Join us for the most anticipated Superbike Championship of the year.",
    registrationFee: "$150",
    totalSpots: 100,
    spotsLeft: 45,
    features: ["Professional Track", "Live Broadcasting", "VIP Hospitality"],
  },
  {
    id: 3,
    title: "Superbike Championship",
    date: "March 25, 2025",
    location: "Silverstone Circuit",
    image:
      "https://images.unsplash.com/photo-1547025603-ef800f02690e?q=80&w=2700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Join us for the most anticipated Superbike Championship of the year.",
    registrationFee: "$150",
    totalSpots: 100,
    spotsLeft: 45,
    features: ["Professional Track", "Live Broadcasting", "VIP Hospitality"],
  },
];

const completedEvents = [
  {
    id: 1,
    title: "Desert Rally Championship",
    date: "February 15, 2025",
    location: "Dubai Desert Circuit",
    image:
      "https://images.unsplash.com/photo-1580397581145-cdb6a35b7d3f?auto=format&fit=crop&q=80&w=800",
    results: [
      {
        position: 1,
        rider: "John Doe",
        time: "2:15:33",
        team: "Red Bull Racing",
      },
      {
        position: 2,
        rider: "Jane Smith",
        time: "2:16:05",
        team: "Monster Energy",
      },
      {
        position: 3,
        rider: "Mike Johnson",
        time: "2:16:45",
        team: "Yamaha Factory",
      },
    ],
  },
  {
    id: 2,
    title: "Desert Rally Championship",
    date: "February 15, 2025",
    location: "Dubai Desert Circuit",
    image:
      "https://images.unsplash.com/photo-1580397581145-cdb6a35b7d3f?auto=format&fit=crop&q=80&w=800",
    results: [
      {
        position: 1,
        rider: "John Doe",
        time: "2:15:33",
        team: "Red Bull Racing",
      },
      {
        position: 2,
        rider: "Jane Smith",
        time: "2:16:05",
        team: "Monster Energy",
      },
      {
        position: 3,
        rider: "Mike Johnson",
        time: "2:16:45",
        team: "Yamaha Factory",
      },
    ],
  },
  {
    id: 3,
    title: "Desert Rally Championship",
    date: "February 15, 2025",
    location: "Dubai Desert Circuit",
    image:
      "https://images.unsplash.com/photo-1580397581145-cdb6a35b7d3f?auto=format&fit=crop&q=80&w=800",
    results: [
      {
        position: 1,
        rider: "John Doe",
        time: "2:15:33",
        team: "Red Bull Racing",
      },
      {
        position: 2,
        rider: "Jane Smith",
        time: "2:16:05",
        team: "Monster Energy",
      },
      {
        position: 3,
        rider: "Mike Johnson",
        time: "2:16:45",
        team: "Yamaha Factory",
      },
    ],
  },
];

const LandingPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Live Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveEvents.map((event) => (
          <Card key={event.id} event={event} type="live" />
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <Card key={event.id} event={event} type="upcoming" />
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Completed Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedEvents.map((event) => (
          <Card key={event.id} event={event} type="completed" />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
