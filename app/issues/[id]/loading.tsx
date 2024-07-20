import { Flex, Card, Skeleton, Text, Box } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton>
        <Text>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</Text>
      </Skeleton>
      <Flex gap="3" my="3" align="center">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-5">
        <Skeleton>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque felis tellus, efficitur id convallis a, viverra eget
            libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
            magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque felis tellus, efficitur id convallis a, viverra eget
            libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
            magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Skeleton>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
