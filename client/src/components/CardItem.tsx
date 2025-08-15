import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Card {
  id: string;
  title: string;
  email: string;
  phone: string;
  socialLinks: string[];
  type: 'business' | 'traveller' | 'social';
  createdAt?: any;
  avatar?: string;
}

interface CardItemProps {
  card: Card;
  variant?: 'list' | 'detail';
  onPress?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export default function CardItem({ 
  card, 
  variant = 'list', 
  onPress, 
  onShare, 
  onEdit, 
  onDelete,
  showActions = true 
}: CardItemProps) {
  const getCardTypeInfo = (type: string) => {
    switch (type) {
      case 'business':
        return { icon: 'briefcase-outline', color: '#3B82F6', label: 'Business' };
      case 'traveller':
        return { icon: 'earth', color: '#10B981', label: 'Traveller' };
      case 'social':
        return { icon: 'chatbubble-ellipses-outline', color: '#8B5CF6', label: 'Social' };
      default:
        return { icon: 'card', color: '#6B7280', label: 'Card' };
    }
  };

  const getCardStyle = (type: string) => {
    switch (type) {
      case 'business':
        return { backgroundColor: '#3B82F6' };
      case 'traveller':
        return { backgroundColor: '#10B981' };
      case 'social':
        return { backgroundColor: '#8B5CF6' };
      default:
        return { backgroundColor: '#6B7280' };
    }
  };

  const typeInfo = getCardTypeInfo(card.type);

  if (variant === 'detail') {
    return (
      <View style={styles.detailContainer} className="bg-white dark:bg-gray-900">
        <View style={[styles.detailCard, getCardStyle(card.type)]}>
          {/* Card Type Label */}
          <View style={styles.cardTypeLabelWrap}>
            <Text style={styles.cardTypeLabel}>{typeInfo.label} Card</Text>
          </View>

          {/* Avatar placeholder */}
          {card.avatar && (
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={64} color="rgba(255,255,255,0.8)" />
            </View>
          )}

          <Text style={styles.detailName}>{card.title}</Text>

          {/* Contact info */}
          {card.phone && (
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.infoText}>{card.phone}</Text>
            </View>
          )}
          {card.email && (
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={16} color="rgba(255,255,255,0.8)" />
              <Text style={styles.infoText}>{card.email}</Text>
            </View>
          )}

          {/* Social links */}
          {card.socialLinks?.length > 0 && (
            <View style={styles.socialLinksSection}>
              {card.socialLinks.map((link: string, idx: number) => (
                <View key={idx} style={styles.infoRow}>
                  <Ionicons name="link-outline" size={16} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.infoText}>{link}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }

  // List variant (default)
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.listItemContainer}>
      {/* Enhanced Card Design */}
      <View style={[styles.listCard, getCardStyle(card.type)]}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderContent}>
            <View style={styles.iconContainer}>
              <Ionicons name={typeInfo.icon as any} size={24} color="white" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={1}>{card.title}</Text>
              <Text style={styles.cardSubtitle} numberOfLines={1}>
                {card.socialLinks?.[0] || ''}
              </Text>
              <View style={styles.typeTagContainer}>
                <View style={styles.typeTag}>
                  <Text style={styles.typeTagText}>{typeInfo.label}</Text>
                </View>
              </View>
            </View>
          </View>
        
          {/* Quick Actions */}
          {showActions && (
            <View style={styles.quickActions}>
              <TouchableOpacity
                onPress={onShare}
                style={styles.quickActionButton}
              >
                <Ionicons name="share-outline" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onEdit}
                style={styles.quickActionButton}
              >
                <Ionicons name="pencil-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        {/* Social links preview */}
        {card.socialLinks?.length > 0 && (
          <View style={styles.socialPreview}>
            <Text style={styles.socialPreviewText} numberOfLines={2}>
              {card.socialLinks.slice(0, 2).join('  •  ')}
            </Text>
          </View>
        )}
        
        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={12} color="white" />
            <Text style={styles.contactText} numberOfLines={1}>
              {card.email}
            </Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={12} color="white" />
            <Text style={styles.contactText}>
              {card.phone}
            </Text>
          </View>
        </View>
      </View>

      {/* Enhanced Action Bar */}
      {showActions && (
        <View style={styles.actionBar}>
          <View style={styles.actionBarContent}>
            <TouchableOpacity
              onPress={onShare}
              style={[styles.actionButton, { backgroundColor: getActionBgColor(typeInfo.color, 'share') }]}
            >
              <Ionicons name="share-social" size={14} color={getActionTextColor(typeInfo.color)} />
              <Text style={[styles.actionButtonText, { color: getActionTextColor(typeInfo.color) }]}>
                Share
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onEdit}
              style={[styles.actionButton, styles.editButton]}
            >
              <Ionicons name="create-outline" size={14} color="#6B7280" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onDelete}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <Ionicons name="trash-outline" size={14} color="#DC2626" />
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const getActionBgColor = (color: string, action: string) => {
  if (action === 'share') {
    switch (color) {
      case '#3B82F6': return '#EFF6FF'; // blue-50
      case '#10B981': return '#ECFDF5'; // green-50
      case '#8B5CF6': return '#F5F3FF'; // purple-50
      default: return '#F9FAFB'; // gray-50
    }
  }
  return '#F9FAFB';
};

const getActionTextColor = (color: string) => {
  switch (color) {
    case '#3B82F6': return '#1D4ED8'; // blue-700
    case '#10B981': return '#059669'; // green-700
    case '#8B5CF6': return '#7C3AED'; // purple-700
    default: return '#374151'; // gray-700
  }
};

const styles = StyleSheet.create({
  // List variant styles
  listItemContainer: {
    marginBottom: 16,
  },
  listCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  typeTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  typeTag: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  typeTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
  },
  quickActionButton: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  socialPreview: {
    marginBottom: 12,
  },
  socialPreviewText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  contactText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginLeft: 4,
    flex: 1,
  },
  actionBar: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    marginTop: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  actionBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 2,
  },
  actionButtonText: {
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 4,
  },
  editButton: {
    backgroundColor: '#F9FAFB',
  },
  editButtonText: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 4,
  },
  deleteButton: {
    backgroundColor: '#FEF2F2',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 4,
  },

  // Detail variant styles
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailCard: {
    width: '90%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  cardTypeLabelWrap: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  cardTypeLabel: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '600',
  },
  avatarContainer: {
    marginBottom: 6,
  },
  detailName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#F3F4F6',
    fontWeight: '500',
    marginLeft: 8,
  },
  socialLinksSection: {
    marginTop: 10,
    width: '100%',
  },
});