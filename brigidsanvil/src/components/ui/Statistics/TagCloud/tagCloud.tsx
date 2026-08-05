import React, { useMemo } from "react";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { selectWorld } from "@/components/store/apiSlice";
import * as articleSliceSelectors from "@/components/store/articlesSlice";
import { ParentSize } from "@visx/responsive";
import { useAppSelector } from "@/components/store/store";

export interface WordData {
  text: string;
  value: number;
}

const colors = [
  "#82caff",
  "#D3B5E5",
  "#ffe28c",
  "#91aaff",
  "#ff9e9e",
  "#ff80c5",
  "#7afbff",
  "#8aff9c",
];

function getRotationDegree(): number {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}

interface WordCloudProps {
  words: WordData[];
  width: number;
  height: number;
}

function WordCloud({ words, width, height }: WordCloudProps) {
  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });

  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  const fixedValueGenerator = () => 0.5;

  return (
    <div className="wordcloud-container">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={"Arial"}
        padding={2}
        spiral="archimedean"
        rotate={getRotationDegree}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={"middle"}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    </div>
  );
}

export default function TagCloud() {
  const world = useAppSelector(selectWorld);
  const worldArticles = useAppSelector(
    articleSliceSelectors.selectWorldArticlesByWorld(world.id)
  );
  const summary = useAppSelector((state) =>
    articleSliceSelectors.selectWorldStatisticsSummary(state, world.id)
  );
  const articles = worldArticles!.articles;

  const tagCount = useMemo(() => {
    const tagCount: Record<string, number> = {};

    articles.forEach((article) => {
      if (article.tags) {
        const tagsSplit = article.tags.split(",");
        tagsSplit.forEach((tag) => {
          const trimmedTag = tag.trim();
          if (!trimmedTag) {
            return;
          }

          if (tagCount[trimmedTag]) {
            tagCount[trimmedTag]++;
          } else {
            tagCount[trimmedTag] = 1;
          }
        });
      }
    });

    return tagCount;
  }, [articles]);

  const tagData: WordData[] = Object.entries(tagCount).map(([text, value]) => ({
    text,
    value,
  }));

  const sortedTagData = tagData.sort((a, b) => b.value - a.value);
  const totalTags = summary.totalTags;
  const averageTagsPerArticle =
    summary.articleCount > 0 ? totalTags / summary.articleCount : 0;
  const numUntaggedArticles = summary.untaggedArticles;

  return (
    <div className="wordcloud-and-tags">
      <div className="row">
        <div className="col">
          <dt>Total Unique Tags</dt>
          <dd>{sortedTagData.length}</dd>
        </div>
        <div className="col">
          <dt>Total Tags Used</dt>
          <dd>{totalTags}</dd>
        </div>
        <div className="col">
          <dt>Average Tags per Article</dt>
          <dd>{averageTagsPerArticle.toFixed(2)}</dd>
        </div>
        <div className="col">
          <dt>Untagged Articles</dt>
          <dd>{numUntaggedArticles}</dd>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-2">
          <div className="tag-list">
            <h5>Tags Breakdown</h5>
            <dl className="article-tags-list">
              {sortedTagData.map(({ text, value }) => (
                <div key={text} className="article-tags-list-count">
                  <dt>{text}:</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="col-md-10">
          <div className="wordcloud">
            <h5>Word Cloud</h5>
            <ParentSize>
              {({ width, height }) => {
                return (
                  <WordCloud
                    words={sortedTagData}
                    width={width}
                    height={height}
                  />
                );
              }}
            </ParentSize>
          </div>
        </div>
      </div>
    </div>
  );
}
