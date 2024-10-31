import { Badge, Card, Flex, Metric, Text } from "@tremor/react";

const Cards = ({ title, count, icon, note }) => {
  return (
    <>
      <Card className=" cursor-pointer">
        <Flex justifyContent="between" alignItems="center">
          <Text>{title}</Text>
          <Badge size="xs" icon={icon}>
            {note}
          </Badge>
        </Flex>
        <Metric>{count}</Metric>
      </Card>
    </>
  );
};

export default Cards;
