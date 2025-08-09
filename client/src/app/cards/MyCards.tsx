import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { CardItem } from './components/CardItem'

type Card = {
  id: string
  name: string
  tagline?: string
  avatar?: string
  email?: string
  phone?: string
  bio?: string
  location?: string
  country?: string
  countryFlag?: string
  tags?: string[]
  socialLinks?: {
    instagram?: string
    linkedin?: string
  }
}

export default function MyCardsScreen() {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    const dummyCards: Card[] = [
      {
        id: '1',
        name: 'Miskat Rahman',
        tagline: 'Digital Nomad & Hosteller',
        avatar: 'https://i.pravatar.cc/150?img=12',
        bio: '"Collecting stories, not things" 🌍',
        location: 'Kolkata',
        country: 'India',
        countryFlag: '🇮🇳',
        tags: ['Backpacker', 'Solo Traveler', 'Photographer'],
        socialLinks: {
          instagram: '@miskat_travels',
          linkedin: 'miskat-rahman'
        }
      },
      {
        id: '2',
        name: 'Zeeshan Ali',
        tagline: 'Tech Nomad & Developer',
        avatar: 'https://i.pravatar.cc/150?img=17',
        bio: '"Code by day, explore by night" ⚡',
        location: 'Karachi',
        country: 'Pakistan',
        countryFlag: '🇵🇰',
        tags: ['Student', 'Developer', 'City Explorer'],
        socialLinks: {
          instagram: '@zeeshan_dev',
          linkedin: 'zeeshan-ali-dev'
        }
      },
      {
        id: '3',
        name: 'Sarah Chen',
        tagline: 'Adventure Seeker',
        avatar: 'https://i.pravatar.cc/150?img=25',
        bio: '"Life begins at the end of comfort zone" 🏔️',
        location: 'Singapore',
        country: 'Singapore',
        countryFlag: '🇸🇬',
        tags: ['Backpacker', 'Foodie', 'Culture Lover'],
        socialLinks: {
          instagram: '@sarah_adventures',
          linkedin: 'sarah-chen-sg'
        }
      }
    ]
    setCards(dummyCards)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Identity Cards</Text>
        <Text style={styles.subtitle}>Travel • Connect • Share</Text>
      </View>

      {cards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>No cards created yet</Text>
        </View>
      ) : (
        <View style={styles.cardsContainer}>
          {cards.map((card) => (
            <CardItem key={card.id} {...card} />
          ))}
        </View>
      )}
    </SafeAreaView>
  )
}

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#424242',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#2979FF',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 34, // Safe area for home indicator
    justifyContent: 'space-evenly',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 18,
    color: '#424242',
    textAlign: 'center',
    fontWeight: '500',
  },
})
