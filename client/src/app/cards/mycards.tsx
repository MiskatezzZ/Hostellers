import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity, 
  RefreshControl,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';
import { router } from 'expo-router';
import CardItem, { Card } from '../../components/CardItem';

export default function MyCardsScreen() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      setError(null);
      const user = auth.currentUser;
      if (!user) {
        setCards([]);
        setError(null);
        return;
      }

      const qRef = query(
        collection(db, 'users', user.uid, 'cards'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(qRef);
      const rows: Card[] = snapshot.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          title: data.title || '',
          email: data.email || '',
          phone: data.phone || '',
          socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
          type: data.type || 'business',
          createdAt: data.createdAt,
        };
      });
      setCards(rows);
    } catch (err: any) {
      console.error('Error fetching cards:', err);
      setError('Failed to fetch cards. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCards();
  };

  const handleDeleteCard = (card: Card) => {
    Alert.alert(
      'Delete Card',
      `Are you sure you want to delete "${card.title}" card?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (!user) {
                Alert.alert('Sign in required');
                return;
              }
              await deleteDoc(doc(db, 'users', user.uid, 'cards', card.id));
              setCards(prev => prev.filter(c => c.id !== card.id));
              Alert.alert('Success', 'Card deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete card');
            }
          }
        },
      ]
    );
  };

  const handleEditCard = (card: Card) => {
    // Navigate to create card screen with edit mode and card type
    router.push(`/cards/createcards?type=${card.type}&edit=true&cardId=${card.id}`);
  };

  const handleShareCard = (card: Card) => {
    // Simple share functionality - you can implement actual sharing later
    Alert.alert(
      'Share Card',
      `Share ${card.title}'s ${card.type} card`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Share', 
          onPress: () => {
            console.log('Sharing card:', card);
            // Here you can implement actual sharing functionality
            // like sharing via SMS, email, or social media
          }
        }
      ]
    );
  };
  

  const renderItem = ({ item }: { item: Card }) => {
    return (
      <CardItem
        card={item}
        variant="list"
        onPress={() => router.push(`/cards/${item.id}` as any)}
        onShare={() => handleShareCard(item)}
        onEdit={() => handleEditCard(item)}
        onDelete={() => handleDeleteCard(item)}
        showActions={true}
      />
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <View className="bg-white pt-12 pb-6 px-4 border-b border-gray-100 shadow-sm">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4"
            >
              <Ionicons name="arrow-back" size={20} color="#374151" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">My Cards</Text>
          </View>
        </View>
        
        <View className="flex-1 items-center justify-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
          <Text className="text-gray-600 font-medium">Loading your cards...</Text>
          <Text className="text-gray-500 text-sm mt-1">Please wait a moment</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <View className="bg-white pt-12 pb-6 px-4 border-b border-gray-100 shadow-sm">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4"
            >
              <Ionicons name="arrow-back" size={20} color="#374151" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">My Cards</Text>
          </View>
        </View>
        
        <View className="flex-1 items-center justify-center px-4">
          <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="alert-circle" size={32} color="#EF4444" />
          </View>
          <Text className="text-red-600 font-semibold text-lg text-center">{error}</Text>
          <TouchableOpacity
            onPress={fetchCards}
            className="bg-blue-500 px-6 py-3 rounded-xl mt-4"
          >
            <Text className="text-white font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <View className="bg-white pt-12 pb-6 px-4 border-b border-gray-100 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4"
            >
              <Ionicons name="arrow-back" size={20} color="#374151" />
            </TouchableOpacity>
            <View>
              <Text className="text-2xl font-bold text-gray-900">My Cards</Text>
              <Text className="text-gray-600 text-sm mt-1">
                {cards.length} card{cards.length !== 1 ? 's' : ''} available
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            onPress={() => router.push('/cards/createtypes')}
            style={{
              backgroundColor: '#3B82F6',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="add" size={18} color="white" />
            <Text style={{ color: 'white', fontWeight: '600', marginLeft: 6, fontSize: 14 }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {cards.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <View className="w-24 h-24 bg-gray-100 rounded-3xl items-center justify-center mb-6">
            <Ionicons name="albums-outline" size={48} color="#9CA3AF" />
          </View>
          <Text className="text-gray-900 font-bold text-xl mb-2">No Cards Yet</Text>
          <Text className="text-gray-600 text-center mb-8 leading-6">
            Create your first card to start networking and connecting with people around the world
          </Text>

        </View>
      ) : (
        <FlatList
          data={cards}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#3B82F6']}
              tintColor="#3B82F6"
            />
          }
        />
      )}
    </View>
  );
}