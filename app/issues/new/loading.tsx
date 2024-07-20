import { Box, Skeleton, Text } from "@radix-ui/themes";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-lg mx-auto p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create New Issue</h1>
      <div className="mb-4">
        <Skeleton>
          <Text>Lorem ipsum dolor sit amet</Text>
        </Skeleton>
      </div>
      <div className="mb-4">
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
      </div>
      <Skeleton>
        <Text>Lorem ipsum dolor sit amet</Text>
      </Skeleton>
    </Box>
  );
};

export default LoadingNewIssuePage;
