import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'

interface CardItemProps {
  name: string
  tagline?: string
  avatar?: string
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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const CARD_WIDTH = screenWidth - 32
const CARD_HEIGHT = (screenHeight - 200) / 3 // Fit 3 cards with header and padding

export const CardItem = ({
  name,
  tagline,
  avatar,
  bio,
  location,
  country,
  countryFlag,
  tags,
  socialLinks,
}: CardItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.96} style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Share icon in top-right corner */}
        <TouchableOpacity style={styles.shareIcon} activeOpacity={0.7}>
          <Text style={styles.shareIconText}>⚡</Text>
        </TouchableOpacity>
        
        {/* Header with avatar and basic info */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar || 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
          </View>
          
          <View style={styles.nameSection}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{name}</Text>
              {countryFlag && (
                <Text style={styles.countryFlag}>{countryFlag}</Text>
              )}
            </View>
            {tagline && <Text style={styles.tagline}>{tagline}</Text>}
            {location && country && (
              <Text style={styles.location}>{location}, {country}</Text>
            )}
          </View>
        </View>

        {/* Bio section */}
        {bio && (
          <View style={styles.bioSection}>
            <Text style={styles.bio}>{bio}</Text>
          </View>
        )}

        {/* Tags section */}
        {tags && tags.length > 0 && (
          <View style={styles.tagsSection}>
            {tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Social links footer */}
        {socialLinks && (
          <View style={styles.socialSection}>
            {socialLinks.instagram && (
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>📷</Text>
                <Text style={styles.socialText}>{socialLinks.instagram}</Text>
              </TouchableOpacity>
            )}
            {socialLinks.linkedin && (
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>💼</Text>
                <Text style={styles.socialText}>{socialLinks.linkedin}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
    alignSelf: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#424242',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2979FF',
  },
  nameSection: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#424242',
    letterSpacing: -0.3,
    marginRight: 8,
  },
  countryFlag: {
    fontSize: 16,
  },
  tagline: {
    fontSize: 13,
    color: '#2979FF',
    fontWeight: '600',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '500',
  },
  bioSection: {
    paddingVertical: 8,
  },
  bio: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  tag: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E8F4FD',
  },
  tagText: {
    fontSize: 11,
    color: '#2979FF',
    fontWeight: '600',
  },
  socialSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  socialIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  socialText: {
    fontSize: 11,
    color: '#757575',
    fontWeight: '500',
    flex: 1,
  },
  shareIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#E1E8ED',
    zIndex: 1,
  },
  shareIconText: {
    fontSize: 16,
    color: '#2979FF',
  },
})
