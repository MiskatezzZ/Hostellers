import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';
import CardItem, { Card } from '../../components/Carditem';

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert('Error', 'You must be signed in to view this card.');
          router.back();
          return;
        }
        const docRef = doc(db, 'users', user.uid, 'cards', id as string);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setCard({ 
            id: snap.id, 
            title: data.title || '',
            email: data.email || '',
            phone: data.phone || '',
            socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
            type: data.type || 'business',
            createdAt: data.createdAt,
            avatar: data.avatar
          });
        } else {
          setCard(null);
        }
      } catch (err) {
        console.error(err);
        setCard(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCard();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ marginTop: 8 }}>Loading card...</Text>
      </View>
    );
  }

  if (!card) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Card not found.</Text>
      </View>
    );
  }

  return (
    <CardItem
      card={card}
      variant="detail"
      showActions={false}
    />
  );
}

const styles = StyleSheet.create({
  error: { color: '#F87171', fontSize: 17, fontWeight: '600' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
