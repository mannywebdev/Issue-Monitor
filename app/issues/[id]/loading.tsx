import { Flex, Card, Skeleton, Text, Box, Grid } from "@radix-ui/themes";

const LoadingIssueDetailPage = () => {
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Skeleton>
          <Text>
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
            dolor sit amet
          </Text>
        </Skeleton>
        <Flex gap="3" my="3" align="center">
          <Skeleton width="5rem" />
          <Skeleton width="8rem" />
        </Flex>
        <Card className="prose max-w-full mt-5">
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
      <Box>
        <Flex gap="3" direction="column" justify="end">
          <Skeleton>
            <Text>Lorem ipsum dolor sit amet</Text>
          </Skeleton>
          <Skeleton>
            <Text>Lorem ipsum dolor sit amet</Text>
          </Skeleton>
        </Flex>
      </Box>
    </Grid>
  );
};

export default LoadingIssueDetailPage;
