import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, Text, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import PoolCard from '@/components/PoolCard';
import { Pool } from '@/types';
import { mockPools } from '@/data/mockData';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function JoinPool() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pools, setPools] = useState<Pool[]>(mockPools);

  const filteredPools = pools.filter(
    (pool) =>
      pool.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pool.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setPools([...mockPools]);
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handlePoolPress = (pool: Pool) => {
    // In a real app, this would navigate to a booking confirmation screen
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Seat booked in pool from ${pool.source} to ${pool.destination}`);
    }, 1500);
  };

  return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Join Pool" rightIcon="filter-list" onRightIconPress={() => { }} />
        <SearchBar
          placeholder="Search by location..."
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClearSearch}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Booking your seat...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredPools}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PoolCard pool={item} onPress={handlePoolPress} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No pools available</Text>
                <Text style={styles.emptySubText}>
                  Try changing your search or pull down to refresh
                </Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SIZES.padding,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginTop: SIZES.padding,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SIZES.padding * 10,
  },
  emptyText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  emptySubText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.font,
    color: COLORS.gray,
    textAlign: 'center',
  },
});