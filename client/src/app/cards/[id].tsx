import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'

type Card = {
  id: string
  name: string
  tagline?: string
  avatar?: string
  email?: string
  phone?: string
  bio?: string
  location?: string
}

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams()
  const [loading, setLoading] = useState(true)
  const [card, setCard] = useState < Card | null > (null)

  useEffect(() => {
    const dummyCards: Card[] = [
      { id: '1', name: 'Miskat', 
        tagline: 'Traveler & Hosteller',
        avatar: 'https://i.pravatar.cc/150?img=12',
        email: 'miskat@example.com',
        phone: '+1234567890',
        bio: 'Loves to travel and meet new people.',
        location: 'Kolkata, India'
      },
      { id: '2', name: 'Zeeshaand', 
        tagline: 'Web Wizard Extraordinaire',
        avatar: 'https://i.pravatar.cc/150?img=17',
        email: 'zeeshan@example.com',
        phone: '+0987654321',
        bio: 'Full-stack developer',
        location: 'Karachi, Pakistan'
      },
    ]

    const found = dummyCards.find((c) => c.id === id)
    setCard(found ?? null)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading card...</Text>
      </View>
    )
  }

  if (!card) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Card not found.</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {card.avatar && (
        <Image
          source={{ uri: card.avatar }}
          style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 16 }}
        />
      )}
      <Text style={styles.name}>{card.name}</Text>
      {card.tagline && <Text style={styles.tagline}>{card.tagline}</Text>}
      {card.email && <Text style={styles.detail}>Email: {card.email}</Text>}
      {card.phone && <Text style={styles.detail}>Phone: {card.phone}</Text>}
      {card.location && <Text style={styles.detail}>Location: {card.location}</Text>}
      {card.bio && <Text style={styles.detail}>Bio: {card.bio}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginTop: 6,
    textAlign: 'center',
  },
})
