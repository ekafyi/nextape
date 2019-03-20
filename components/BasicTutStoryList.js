import Link from 'next/link';

const StoryList = ({ stories }) => (
	<div className="story-list">
		{stories.map(story => (
			<div key={story.id} className="story">
				<h2 className="story-title">
					<a href={story.url} target="_blank">
						{story.title}
					</a>
				</h2>
				<div className="story-detail">
					<span>{story.points || 0} points</span>
					<Link href={`/story?id=${story.id}`}>
						<a>{story.comments_count || 0} comments</a>
					</Link>
				</div>
			</div>
		))}

		<style jsx>
			{`
				.story-list {
					padding: 0 1em;
				}
				.story {
					padding: 1em 0;
				}
				.story-title {
					font-size: 1rem;
					font-weight: 400;
					margin: 0;
					margin-bottom: 0.5rem;
				}
				.story-title a {
					color: #444444;
					text-decoration: none;
				}
				.story-title a:hover,
				.story-detail a:hover {
					text-decoration: underline;
				}
				.story-detail {
					font-size: 0.8rem;
					font-weight: bold;
				}
				.story-detail span {
					margin-right: 1rem;
				}
				.story-detail a {
					color: #ffa500;
					text-decoration: none;
				}
			`}
		</style>
	</div>
);

export default StoryList;