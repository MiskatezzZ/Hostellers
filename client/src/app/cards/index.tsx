import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

export default function CardsIndex() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cards Dashboard</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/cards/createcards')}
      >
        <Text style={styles.buttonText}>➕ Create New Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/cards/MyCards')}
      >
        <Text style={styles.buttonText}>📇 View My Cards</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})
