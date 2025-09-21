import { Button, ContextMenu, HStack, Host, Image, Spacer, Text } from '@expo/ui/swift-ui';
import { Link, Stack } from 'expo-router';
import { FlatList, useColorScheme } from 'react-native';

import { FlavourList } from '@/model';
import { frame } from '@expo/ui/swift-ui/modifiers';

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Flavour List',
          headerLargeTitle: true,
          headerSearchBarOptions: {
            hideWhenScrolling: true,
          },
          headerRight: () => {
            return (
              <Host matchContents>
                <ContextMenu>
                  <ContextMenu.Items>
                    <Button onPress={() => {}}>Show Favourites Only</Button>
                    <Button onPress={() => {}}>Hide Tasted</Button>
                    <Button onPress={() => {}}>Show Current Only</Button>
                    <Button onPress={() => {}}>Show Vegan Only</Button>
                    <Button onPress={() => {}}>Show Dairy Free Only</Button>
                    <Button onPress={() => {}}>Show Gluten Free Only</Button>
                    <Button onPress={() => {}}>Show Nut Free Only</Button>
                    <Button onPress={() => {}}>Show Alcohol Free Only</Button>
                  </ContextMenu.Items>
                  <ContextMenu.Trigger>
                    {/* iOS 26 header buttons have height and width of 36, so we add static width 
                    and height to keep the entire area tappable */}
                    <HStack modifiers={[frame({ width: 36, height: 36 })]}>
                      <Image systemName="line.3.horizontal.decrease.circle" size={28} />
                    </HStack>
                  </ContextMenu.Trigger>
                </ContextMenu>
              </Host>
            );
          },
        }}
      />
      <Host style={{ flex: 1 }} colorScheme={colorScheme}>
        <FlatList
          data={FlavourList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Link href={`/flavours/${item.id}`} asChild>
              <Link.Trigger>
                <FlavourItem item={item} index={index} />
              </Link.Trigger>
              <Link.Preview>
                <FlavourItem item={item} index={index} />
              </Link.Preview>
              <Link.Menu>
                <Link.MenuAction icon="eye" title="View" onPress={() => {}} />
                <Link.MenuAction icon="pencil" title="Edit" onPress={() => {}} />
                <Link.MenuAction icon="trash" destructive title="Delete" onPress={() => {}} />
              </Link.Menu>
            </Link>
          )}
        />
      </Host>
    </>
  );
}

function FlavourItem({ item, index }: { item: any; index: number }) {
  return (
    <Host matchContents modifiers={[frame({ width: 100, height: 64 })]}>
      <Button>
        <HStack spacing={8}>
          <Text size={14} color="secondary">{`#${index + 1}:`}</Text>
          <Text size={14} color="primary">{`${item.name}`}</Text>
          <Spacer />
          <Image systemName="chevron.right" size={14} color="secondary" />
        </HStack>
      </Button>
    </Host>
  );
}
