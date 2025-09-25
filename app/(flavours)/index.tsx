import { FlavourList } from '@/model';
import { Button, ContextMenu, Group, Host, HStack, Image, Text, VStack } from '@expo/ui/swift-ui';
import { background, border, clipShape, frame, padding } from '@expo/ui/swift-ui/modifiers';
import { FlashList } from '@shopify/flash-list';
import { Link, Stack, useRouter } from 'expo-router';
import { Dimensions, useColorScheme, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'list',
          headerShown: true,
          headerBackButtonDisplayMode: 'minimal',
          headerTransparent: true,
        }}
      />
      <FlashList
        data={FlavourList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Link href={`/flavours/${item.id}`} asChild>
            <Link.Trigger>
              <FlavourItem item={item} index={index} />
            </Link.Trigger>
            <Link.Preview
              style={{
                height: 100,
                width: screenWidth - 12,
                backgroundColor: '#fff',
              }}>
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
    </>
  );
}

function FlavourItem({ item, index }: { item: any; index: number }) {
  const cardWidth = screenWidth - 12;

  const cardModifiers = [
    frame({
      width: cardWidth,
      height: 100,
    }),
    background('red'),
    border({
      color: 'black',
      width: 1,
    }),
    clipShape('roundedRectangle', 32),
  ];

  const router = useRouter();
  return (
    <View style={{ height: 100, width: cardWidth, marginBottom: 6, backgroundColor: 'blue' }}>
      <Host
        style={{ height: 100, width: cardWidth, margin: 0 }}
        modifiers={[
          frame({
            width: cardWidth,
            height: 100,
          }),
        ]}>
        <Group
          onPress={() => {
            router.push(`/flavours/${item.id}`);
          }}
          modifiers={cardModifiers}>
          <HStack
            alignment="center"
            modifiers={[
              padding({
                leading: 16,
              }),
            ]}>
            <VStack alignment="leading">
              <Text size={14} color="primary">
                {item.name}
              </Text>
            </VStack>
            <ContextMenu activationMethod="singlePress">
              <ContextMenu.Items>
                <Button key={'edit'} systemImage={'pencil'} onPress={() => {}}>
                  {'edit'}
                </Button>
              </ContextMenu.Items>
              <ContextMenu.Trigger>
                <Image
                  systemName="ellipsis"
                  color={'black'}
                  size={50}
                  modifiers={[
                    frame({
                      width: 50,
                      height: 50,
                      alignment: 'center',
                    }),
                  ]}
                />
              </ContextMenu.Trigger>
            </ContextMenu>
          </HStack>
        </Group>
      </Host>
    </View>
  );
}
