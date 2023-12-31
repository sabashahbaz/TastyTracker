"""empty message

Revision ID: 620ea1cf6146
Revises: 
Create Date: 2023-09-26 12:45:55.052915

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '620ea1cf6146'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('password_hash', sa.String(length=125), nullable=False),
    sa.Column('tdee', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('current_day_log_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('total_daily_calories_eaten', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('item_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('description', sa.String(length=400), nullable=False),
    sa.Column('calories', sa.Integer(), nullable=False),
    sa.Column('meal_type', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('item_and_log_association_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('current_day_log_id', sa.Integer(), nullable=True),
    sa.Column('item_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['current_day_log_id'], ['current_day_log_table.id'], ),
    sa.ForeignKeyConstraint(['item_id'], ['item_table.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('item_user_association',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('item_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['item_id'], ['item_table.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_and_log_association_table',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('current_day_log_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['current_day_log_id'], ['current_day_log_table.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user_table.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_and_log_association_table')
    op.drop_table('item_user_association')
    op.drop_table('item_and_log_association_table')
    op.drop_table('item_table')
    op.drop_table('current_day_log_table')
    op.drop_table('user_table')
    # ### end Alembic commands ###
